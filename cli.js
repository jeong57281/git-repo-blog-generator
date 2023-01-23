#!/usr/bin/env node

const { spawn } = require('child_process');
const getRepoInfo = require('git-repo-info')();
const getRepoName = require('git-repo-name');
const { getCliCwd } = require('./src/util/process.js');
const { E_NO_GIT, E_NO_GATSBY_CLI, E_USAGE } = require('./src/constants');

// .git을 찾을 수 없을 때
if (!getRepoInfo.commonGitDir) {
  console.log(E_NO_GIT);
  process.exit(1);
}

(async () => {
  // $ grbgen build
  if (process.argv[2] === 'build') {
    const cliCwd = await getCliCwd();

    const buildCmd = spawn('./node_modules/.bin/gatsby', ['build', '--prefix-paths'], {
      stdio: 'inherit',
      cwd: __dirname,
      env: {
        ...process.env,
        PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}/dist`,
      },
    });

    buildCmd.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.log(E_NO_GATSBY_CLI);
      }
    });
  }
  // $ grbgen develop
  else if (process.argv[2] === 'develop') {
    const devCmd = spawn('./node_modules/.bin/gatsby', ['develop'], {
      stdio: 'inherit',
      cwd: __dirname,
    });

    devCmd.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.log(E_NO_GATSBY_CLI);
      }
    });
  }
  // 잘못된 사용
  else {
    console.log(E_USAGE);
  }
})();
