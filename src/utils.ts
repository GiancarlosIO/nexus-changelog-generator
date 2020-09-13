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

export const getConventionalCommitType: (commit: RawCommit) => CommitTypes = (
  commit
) => {
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
    return undefined;
  }

  return undefined;
};

export const parseCommit: (
  commit: RawCommit,
  repositoryUrl?: string
) => Commit = (commit: RawCommit, repositoryUrl) => {
  const commitScope = getCommitScope(commit);
  return {
    ...commit,
    isFromMerge: isFromMerge(commit),
    conventionalCommitType: getConventionalCommitType(commit),
    commitScope,
    /**
     * 'feat(Menu): Implement swiper component' => ['feat(Menu)', 'Implement swiper component'] => 'Implement swiper component'
     */
    messageWithoutTypeAndScope: commit.subject.includes(':')
      ? commit.subject.split(':')[1].trim()
      : commit.subject,
    authorName: `${commit.author.name} (${commit.author.email})`,
    url: repositoryUrl ? `${repositoryUrl}/${commit.commit.long}` : undefined,
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

  return newTag;
};

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

export const getRepositoryUrl = async () => {
  const remoteOriginUrl = ((await execa(
    'git',
    'config --get remote.origin.url'.split(' ')
  )) as unknown) as string;

  if (remoteOriginUrl.includes('bitbucket')) {
    const orgAndRepositoryName = remoteOriginUrl
      .replace(/\n/g, '')
      .replace('.git', '')
      .split(':')[1];

    return `https://bitbucket.org/${orgAndRepositoryName}`;
  }

  // github by default
  return remoteOriginUrl.replace(/\n/g, '').replace('.git', '');
};

export const generateChangelog = async (commits: RawCommit[]) => {
  const repositoryUrl = await getRepositoryUrl();
  const commitArr = commits
    .map((commit) => parseCommit(commit, repositoryUrl))
    .filter((commit) => !commit.isFromMerge)
    .filter(
      // we only want the commits with the `conventional commits` structure
      (commit) =>
        commit.conventionalCommitType &&
        Object.keys(CommitTypesObj).includes(commit.conventionalCommitType)
    );

  /**
   * We need to get the date of the last commit.
   */
  const changelogCreatedAt = commits[
    commits.length - 1
  ].committer.date.toLocaleDateString();

  const commitsByAppScope = commitArr.reduce<{ [key: string]: Commit[] }>(
    (acc, nextCommit) => {
      const { commitScope } = nextCommit;

      if (commitScope) {
        if (typeof commitScope === 'object') {
          // acc[commitScope.] = [...(acc[commitScope] || []), nextCommit];
        } else {
          acc[commitScope] = [...(acc[commitScope] || []), nextCommit];
        }
      } else {
        acc.common = [...(acc.common || []), nextCommit];
      }
      return acc;
    },
    {}
  );

  const body = Object.keys(commitsByAppScope)
    .map((commitScopeKey) => {
      return `
### ${commitScopeKey}
${commitsByAppScope[commitScopeKey]
  .map(
    (commit) => `* ${commit.subject} ([${commit.commit.short}](${commit.url}))`
  )
  .join('\n')}
`;
    })
    .join('');

  return `
## ${changelogCreatedAt}
${body}
  `;
};
