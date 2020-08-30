import path from 'path';
import util from 'util';
import fs from 'fs';

import getStream from 'get-stream';
import execa from 'execa';
// @ts-ignore
import gitLogParser from 'git-log-parser';

const readFile = util.promisify(fs.readFile);

import {
  RawCommit,
  CommitTypes,
  CommitScope,
  Commit,
  CommitTypesObj,
} from './types';

Object.assign(gitLogParser.fields, {
  hash: 'H',
  message: 'B',
  gitTags: 'd',
  committerDate: { key: 'ci', type: Date },
});

export async function getCommits({ from = '', to = 'HEAD' }) {
  return (
    await getStream.array<RawCommit>(
      gitLogParser.parse({
        _: `${from ? from + '..' : ''}${to}`,
        decorate: true,
      })
    )
  ).map(({ message, gitTags, ...commit }) => ({
    ...commit,
    message: message.trim(),
    gitTags: gitTags.trim(),
  }));
}

const isFromMerge = (commit: RawCommit) =>
  commit.subject.includes('Merged in') ||
  commit.subject.includes('Merge branch');

/**
 * First, we need to identify the type of the current commit.
 * */

export const getCommitType: (commit: RawCommit) => CommitTypes = (commit) => {
  if (isFromMerge(commit)) {
    return undefined;
  }

  if (!commit.subject.includes(':')) {
    return undefined;
  }

  const type = commit.subject.split(':')[0];

  if (type.includes('(')) {
    return type.split('(')[0] as CommitTypes;
  }

  if (type.endsWith('!') || commit.subject.includes('BREAKING CHANGE')) {
    return 'BREAKING CHANGE';
  }

  return type as CommitTypes;
};

type GetScope = (commit: RawCommit) => CommitScope;
export const getCommitScope: GetScope = ({ subject }) => {
  if (subject.includes(':')) {
    const typeAndScope = subject.split(':')[0];

    // verify if it has the form of "feat(MainMenu)"
    if (typeAndScope.includes('(')) {
      // console.log({ subject, commitSubject: subject.split(':')[0] });
      const scope = typeAndScope.split('(')[1].replace(')', '');

      // verify if it has the form of "feat(MainMenu/Right)"
      if (scope.includes('/')) {
        return {
          app: scope.split('/')[0],
          component: scope.split('/')[1],
        };
      }

      return scope;
    }
    return typeAndScope;
  }

  return undefined;
};

export const parseCommit: (commit: RawCommit) => Commit = (
  commit: RawCommit
) => {
  return {
    ...commit,
    isFromMerge: isFromMerge(commit),
    conventionalCommitType: getCommitType(commit),
    appScope: getCommitScope(commit),
    authorName: `${commit.author.name} (${commit.author.email})`,
  };
};

export const getGitTags = async () => {
  const tagsString = (await execa('git', ['tag', '--merged'])).stdout;
  if (tagsString) {
    return tagsString
      .split('\n')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

export const getAndSetNewGitTag = async (commits: (RawCommit | Commit)[]) => {
  const newTag = `v0.${commits[0].commit.long.slice(0, 8)}`;
  await execa('git', ['tag', '-a', newTag, '-m', `Tag ${newTag}`]);

  return newTag
}

// TODO: PUSH TAGS TO ORIGIN
// git push origin --tags

export const getPackageVersion = async () => {
  const currentPath = process.cwd();

  const packageJson = await readFile(
    path.resolve(currentPath, './package.json'),
    { encoding: 'utf8' }
  );

  return JSON.parse(packageJson).version;
};

export const generateChangelog = (commits: RawCommit[]) => {
  const commitArr = commits
    .map(parseCommit)
    .filter((commit) => !commit.isFromMerge)
    .filter(
      // we only want the commits with the `conventional commits` structure
      (commit) =>
        commit.conventionalCommitType &&
        Object.keys(CommitTypesObj).includes(commit.conventionalCommitType)
    );
  // console.log({ commitArr: commitArr.slice(commitArr.length -10, commitArr.length) });
  console.log({ commitArr });

  return `
    # Commit
    ${commitArr.map(commit => `${commit.commit.long}:${commit.subject} `).join('\n')}
  `;
};
