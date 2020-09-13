import * as faker from 'faker';

import { generateChangelog, getRepositoryUrl } from '../utils';

const commitList = Array.from({ length: 20 }).map(() => ({
  commit: {
    // @ts-ignore
    long: faker.git.commitSha,
    // @ts-ignore
    short: faker.git.shortSha(),
  },
  tree: {
    // @ts-ignore
    long: faker.git.commitSha(),
    // @ts-ignore
    short: faker.git.shortSha(),
  },
  author: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    date: faker.date.past(),
  },
  committer: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    date: faker.date.past(),
  },
  // @ts-ignore
  subject: `feat(${faker.system.fileName()}): ${faker.git.commitMessage()}`,
  body: faker.lorem.sentences(2),
  // @ts-ignore
  hash: faker.git.commitSha(),
  committerDate: '2020-09-11T15:19:36.000Z',
  // @ts-ignore
  message: `feat(${faker.system.fileName()}): ${faker.git.commitMessage()}`,
  gitTags: '',
}));

describe('Utils', () => {
  it('<generateChangelog> should create the readme.md content by parsing an array of commits', () => {
    const changelog = generateChangelog(commitList);

    expect(changelog).toMatchSnapshot();
  });

  it('<getRepositoryUrl> should return the remote repository url', async () => {
    const given = await getRepositoryUrl();
    const want = 'https://bitbucket.org/repositoryOrg/repositoryName';
    expect(given).toEqual(want);

    require('execa').default.__setMockValueReturnedForGitUrl(
      'https://github.com/repositoryOrg/repositoryName.git\n'
    );
    const givenGithub = await getRepositoryUrl();
    const wantGithub = 'https://github.com/repositoryOrg/repositoryName';
    expect(givenGithub).toEqual(wantGithub);
  });
});
