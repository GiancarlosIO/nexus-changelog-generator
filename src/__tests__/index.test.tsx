import { generateChangelog, getRepositoryUrl } from '../utils';

const commits = [
  {
    commit: {
      long: '8ea320ac9b7f1b0787d698ff2c460710c449ee98',
      short: '8ea320ac9b',
    },
    tree: {
      long: '69093481f177797739dc36a04f52787267a1b5b2',
      short: '69093481f1',
    },
    author: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:19:36.000Z',
    },
    committer: {
      name: 'Giancarlos Isasi',
      email: 'giancarlos@crehana.com',
      date: '2020-09-11T15:19:36.000Z',
    },
    subject: 'fix(manage): Add landings banner column to banners admin',
    body: 'This must be rendered only for Perú.',
    hash: '8ea320ac9b7f1b0787d698ff2c460710c449ee98',
    committerDate: '2020-09-11T15:19:36.000Z',
    message: 'fix(manage): Add landings banner column to banners admin',
    gitTags: '',
  },
  {
    commit: {
      long: '8ea320ac9b7f1b0787d698ff2c460710c449ee98',
      short: '8ea320ac9b',
    },
    tree: {
      long: '69093481f177797739dc36a04f52787267a1b5b2',
      short: '69093481f1',
    },
    author: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:19:36.000Z',
    },
    committer: {
      name: 'Giancarlos Isasi',
      email: 'giancarlos@crehana.com',
      date: '2020-09-11T15:19:36.000Z',
    },
    subject: 'feat(manage): Add landings banner column to banners admin',
    body: 'This must be rendered only for Perú.',
    hash: '8ea320ac9b7f1b0787d698ff2c460710c449ee98',
    committerDate: '2020-09-11T15:19:36.000Z',
    message: 'feat(manage): Add landings banner column to banners admin',
    gitTags: '',
  },
  {
    commit: {
      long: 'cead6af040c7d54d5dddba653ac64971c1d9bf68',
      short: 'cead6af040',
    },
    tree: {
      long: '228f92b52f430458e258aae14c4ec2131a910652',
      short: '228f92b52f',
    },
    author: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:35:57.000Z',
    },
    committer: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:35:57.000Z',
    },
    subject: 'fix(DegreeLanding): SEO improvements',
    body: '',
    hash: 'cead6af040c7d54d5dddba653ac64971c1d9bf68',
    committerDate: '2020-09-11T15:35:57.000Z',
    message: 'fix(DegreeLanding): SEO improvements',
    gitTags: '',
  },
  {
    commit: {
      long: '9a8e6adc0202bce39919975fb9e07d1f0117a9e5',
      short: '9a8e6adc02',
    },
    tree: {
      long: '99c979bc67c86f62e36cae724138fcf95e62c703',
      short: '99c979bc67',
    },
    author: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:36:24.000Z',
    },
    committer: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:36:24.000Z',
    },
    subject:
      'docs(crehana-ui): Consider default text color in Typography stories',
    body: 'This must be rendered only for Perú.',
    hash: '9a8e6adc0202bce39919975fb9e07d1f0117a9e5',
    committerDate: '2020-09-11T15:36:24.000Z',
    message:
      'docs(crehana-ui): Consider default text color in Typography stories',
    gitTags: '',
  },
  {
    commit: {
      long: '7dc79f95f7526dc811013e664d9ce1bf0ebc6a0a',
      short: '7dc79f95f7',
    },
    tree: {
      long: '46acd3ac1a658e78fbe925b3aff6169712b0d420',
      short: '46acd3ac1a',
    },
    author: {
      name: 'Wai Ka Wong',
      email: 'waika@crehana.com',
      date: '2020-09-11T15:42:14.000Z',
    },
    committer: {
      name: 'Giancarlos Isasi',
      email: 'giancarlos@crehana.com',
      date: '2020-09-11T15:42:14.000Z',
    },
    subject: 'chore(bitbucket-pipelines): Remove unnecessary argv param',
    body: 'Improved by...',
    hash: '7dc79f95f7526dc811013e664d9ce1bf0ebc6a0a',
    committerDate: '2020-09-11T15:42:14.000Z',
    message: 'chore(bitbucket-pipelines): Remove unnecessary argv param',
    gitTags: '',
  },
  {
    commit: {
      long: '075637cfdc4334234a1bc3a63f87e4c0d5897d34',
      short: '075637cfdc',
    },
    tree: {
      long: 'f589b357f4288d3f56c61605175ec19ab1ba83f2',
      short: 'f589b357f4',
    },
    author: {
      name: 'Giancarlos Isasi',
      email: 'giancarlos@crehana.com',
      date: '2020-09-11T15:46:18.000Z',
    },
    committer: {
      name: 'Giancarlos Isasi',
      email: 'giancarlos@crehana.com',
      date: '2020-09-11T15:46:18.000Z',
    },
    subject:
      'feat(MainMenu/Left/Learn): Implement MiniDegreeCard component inside the Courses Tab',
    body: 'This must be rendered only for Perú.',
    hash: '075637cfdc4334234a1bc3a63f87e4c0d5897d34',
    committerDate: '2020-09-11T15:46:18.000Z',
    message:
      'feat(MainMenu/Left/Learn): Implement MiniDegreeCard component inside the Courses Tab',
    gitTags: '',
  },
  {
    commit: {
      long: '25367271d0eb8d6e3ea046574e0cbe1ea62e4c05',
      short: '25367271d0',
    },
    tree: {
      long: 'f589b357f4288d3f56c61605175ec19ab1ba83f2',
      short: 'f589b357f4',
    },
    author: {
      name: 'Estefany Valdivieso',
      email: 'estefany@crehana.com',
      date: '2020-09-11T15:47:37.000Z',
    },
    committer: {
      name: 'Estefany Valdivieso',
      email: 'estefany@crehana.com',
      date: '2020-09-11T15:47:37.000Z',
    },
    subject: 'Merged in crehana-icons-v3.83.0 (pull request #3503)',
    body: 'crehana-icons: v3.83.0\n',
    hash: '25367271d0eb8d6e3ea046574e0cbe1ea62e4c05',
    committerDate: '2020-09-11T15:47:37.000Z',
    message:
      'Merged in crehana-icons-v3.83.0 (pull request #3503)\n\ncrehana-icons: v3.83.0',
    gitTags: '',
  },
  {
    commit: {
      long: '186c0b83a7f0eba17b46d3e88d0f22b6a4609983',
      short: '186c0b83a7',
    },
    tree: {
      long: '6ad570751303be3a936d29b9d7b640aef49c03f0',
      short: '6ad5707513',
    },
    author: {
      name: 'Gustavo',
      email: 'gustavo@crehana.com',
      date: '2020-09-11T18:04:44.000Z',
    },
    committer: {
      name: 'Gustavo',
      email: 'gustavo@crehana.com',
      date: '2020-09-11T18:04:44.000Z',
    },
    subject: 'feat(manage): Add landings banner column to banners admin',
    body: '',
    hash: '186c0b83a7f0eba17b46d3e88d0f22b6a4609983',
    committerDate: '2020-09-11T18:04:44.000Z',
    message: 'feat(manage): Add landings banner column to banners admin',
    gitTags: '',
  },
  {
    commit: {
      long: 'b504854ab46236e95fdbd525fd798d38d5a2e7a3',
      short: 'b504854ab4',
    },
    tree: {
      long: '6ad570751303be3a936d29b9d7b640aef49c03f0',
      short: '6ad5707513',
    },
    author: {
      name: 'Gustavo Pajuelo',
      email: 'gustavo@crehana.com',
      date: '2020-09-11T18:06:27.000Z',
    },
    committer: {
      name: 'Gustavo Pajuelo',
      email: 'gustavo@crehana.com',
      date: '2020-09-11T18:06:27.000Z',
    },
    subject: 'feat(Auth/Utils): Replace google analytics track with gtag',
    body: 'feat(manage): Add landings banner column to banners admin\n',
    hash: 'b504854ab46236e95fdbd525fd798d38d5a2e7a3',
    committerDate: '2020-09-11T18:06:27.000Z',
    message: 'feat(Auth/Utils): Replace google analytics track with gtag',
    gitTags: '(origin/master, origin/HEAD)',
  },
  {
    commit: {
      long: 'f21fff9298d3045e3a118d25530a0aaf5fc0acbe',
      short: 'f21fff9298',
    },
    tree: {
      long: '1609a63486ef42f759c4ec8ea6f40b4ffbd4d117',
      short: '1609a63486',
    },
    author: {
      name: 'Giancarlos',
      email: 'giancarlos.isasi@gmail.com',
      date: '2020-09-11T19:35:59.000Z',
    },
    committer: {
      name: 'Giancarlos',
      email: 'giancarlos.isasi@gmail.com',
      date: '2020-09-11T19:35:59.000Z',
    },
    subject:
      'chore: Create initial files to configure jest for client and server tests',
    body: '',
    hash: 'f21fff9298d3045e3a118d25530a0aaf5fc0acbe',
    committerDate: '2020-09-11T19:35:59.000Z',
    message:
      'chore: Create initial files to configure jest for client and server tests',
    gitTags: '',
  },
  {
    commit: {
      long: '0ebd2b8a7b6ef4c7e59f18e2ec89c49857715650',
      short: '0ebd2b8a7b',
    },
    tree: {
      long: '4190b1a3fc9ade785e74f3e4cb4e8a4036d4aeaa',
      short: '4190b1a3fc',
    },
    author: {
      name: 'Giancarlos',
      email: 'giancarlos.isasi@gmail.com',
      date: '2020-09-11T19:36:09.000Z',
    },
    committer: {
      name: 'Giancarlos',
      email: 'giancarlos.isasi@gmail.com',
      date: '2020-09-11T19:36:09.000Z',
    },
    subject:
      "Merge branch 'master' of bitbucket.org:crehana/crehana into CREH-7998-ci-cd-tests-runners-jest-and-c",
    body: '',
    hash: '0ebd2b8a7b6ef4c7e59f18e2ec89c49857715650',
    committerDate: '2020-09-11T19:36:09.000Z',
    message:
      "Merge branch 'master' of bitbucket.org:crehana/crehana into CREH-7998-ci-cd-tests-runners-jest-and-c",
    gitTags: '(HEAD -> CREH-7998-ci-cd-tests-runners-jest-and-c)',
  },
];

describe('Utils', () => {
  it('<generateChangelog> should create the readme.md content by parsing a commits array', () => {
    const commitList = commits.map((c) => ({
      ...c,
      committerDate: new Date(c.committerDate),
      committer: {
        ...c.committer,
        date: new Date(c.committer.date),
      },
    }));
    const changelog = generateChangelog(commitList);

    expect(changelog).toMatchSnapshot();
  });

  it('<getRepositoryUrl> should return the remote repository url', () => {
    const givenBitbucket = getRepositoryUrl(
      'git@bitbucket.org:crehana/crehana.git'
    );
    const expectedBitbucket = 'https://bitbucket.org/crehana/crehana';

    const givenGithub = getRepositoryUrl(
      'https://github.com/crehana/crehana.git'
    );
    const expectedGithub = 'https://github.com/crehana/crehana'

    expect(givenBitbucket).toEqual(expectedBitbucket);
    expect(givenGithub).toEqual(expectedGithub);
  });
});
