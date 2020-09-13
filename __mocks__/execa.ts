const commandOutputs: { [key: string]: string } = {
  'git config --get remote.origin.url': `
git@bitbucket.org:repositoryOrg/repositoryName.git
`,
};

const execa = (command: string, params: string[]) => {
  return Promise.resolve(commandOutputs[`${command} ${params.join(' ')}`]);
};

execa.__setMockValueReturnedForGitUrl = (value = 'git@bitbucket.org:repositoryOrg/repositoryName.git\n') => {
  commandOutputs['git config --get remote.origin.url'] = value;
};

export default execa;
