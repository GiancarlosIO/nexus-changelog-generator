// import util from 'util';
// import fs from 'fs';
// import execa from 'execa';

import ora from 'ora';

import {
  getCommits,
  parseCommit,
  // getGitTags,
  // getPackageVersion,
} from './utils';
import { CommitTypesObj } from './types';

// const writeFile = util.promisify(fs.writeFile);
// const currentPath = process.cwd();

const spinner = ora('Parsing commit...');

async function run() {
  spinner.start();
  const commits = await getCommits({
    to: 'HEAD',
  });
  // ====== Parse commits ====== //
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
  spinner.succeed(
    'Success to parse commits, found ${commitArr.length} commits.'
  );


  // ====== Git TAGS ====== //
  spinner.start('Analyzing git tags...');
  // const packageVersion = await getPackageVersion();
  // const gitTags = await getGitTags();
  // if (gitTags.length === 0) {
  //   spinner.info(`Git tags empty. Creating a new "v${packageVersion}" tag.`);
  //   const newTag = `v${packageVersion}`;
  //   execa('git', ['tag', '-a', newTag, '-m', `Tag ${newTag}`]);
  //   spinner.succeed(`Tag ${newTag} created successfully.`);
  // }


  spinner.succeed('Success to generate the changelog.md file!');
}

run()
  .then(() => {
    // console.log('> Finish to generate changelog.md file.');
  })
  .catch(console.error);
