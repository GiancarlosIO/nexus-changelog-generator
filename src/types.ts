export enum CommitTypesObj {
  'feat' = 'feat',
  fix = 'fix',
  docs = 'docs',
  style = 'style',
  refactor = 'refactor',
  perf = 'perf',
  test = 'test',
  chore = 'chore',
  changelog = 'changelog',
  'BREAKING CHANGE' = 'BREAKING CHANGE',
}

export type CommitTypes = keyof typeof CommitTypesObj | undefined;

export type RawCommit = {
  commit: {
    long: string;
    short: string;
  };
  tree: {
    long: string;
    short: string;
  };
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  subject: string;
  body: string;
  message: string;
  gitTags: string;
};

export type CommitScope =
  | undefined
  | string
  | { app: string; component: string };

export type Commit = RawCommit & {
  isFromMerge: boolean;
  conventionalCommitType: CommitTypes;
  messageWithoutTypeAndScope: string;
  commitScope: CommitScope;
  authorName: string;
  url?: string;
};
