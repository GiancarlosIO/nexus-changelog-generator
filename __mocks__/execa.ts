const commandOutputs: { [key: string]: string } = {
  'git config --get remote.origin.url': `
git@bitbucket.org:crehana/crehana.git
`,
};

const execa = (command: string, params: string[]) => {
  return Promise.resolve(commandOutputs[`${command} ${params.join(' ')}`]);
};

export default execa;
