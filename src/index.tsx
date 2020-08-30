// import util from 'util';
// import fs from 'fs';
// import execa from 'execa';

import ora from 'ora';

import {
  getCommits,
  getGitTags,
  generateChangelog,
  getAndSetNewGitTag,
} from './utils';
// import { CommitTypesObj } from './types';

// const writeFile = util.promisify(fs.writeFile);
// const currentPath = process.cwd();

async function run() {
  const spinner = ora();

  // ====== Git TAGS and get commits====== //
  spinner.start('Parsing commit...');

  spinner.start('Analyzing git tags...');
  const gitTags = await getGitTags();

  if (gitTags.length === 0) {
    spinner.info(`Git: Tags are empty. Creating a new git tag.`);
    const commits = await getCommits({
      to: 'HEAD',
    });
    const newTag = await getAndSetNewGitTag(commits);
    spinner.succeed(`Tag "${newTag}" created successfully.`);

    // ====== Get, Parse commits and generate the CHANGELOG content ====== //

    const changelog = generateChangelog(commits);
    console.log(changelog);
  } else {
    // ====== Get, Parse commits and generate the CHANGELOG content ====== //
    const from = gitTags[gitTags.length - 1];
    spinner.info(`Getting commits from ${from} to 'HEAD'.`);
    const commits = await getCommits({
      from: `${from}`,
      to: 'HEAD',
    });

    if (commits.length === 0) {
      spinner.succeed(
        "No commits to evaluate. Alright, looks like you has no commits since the last git tag. That's ok, don't worry :)"
      );
      process.exit(0)
    }

    const newTag = await getAndSetNewGitTag(commits);
    spinner.succeed(`Tag "${newTag}" created successfully.`);

    const changelog = generateChangelog(commits);
    console.log(changelog);
  }

  spinner.succeed('Success to generate the changelog.md file!');
}

run()
  .then(() => {
    // console.log('> Finish to generate changelog.md file.');
  })
  .catch(console.error);
