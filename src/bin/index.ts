#!/usr/bin/env node

import path from 'path';
import { spawn } from 'child_process';
import getRepoInfo from 'git-repo-info';

import {
  E_NO_GIT,
  E_NO_GATSBY_CLI,
  E_USAGE,
  CLI_PROCESS_NAME,
} from '../constants';
import { getCliCwd } from '../utils/process';

const getRepoName = require('git-repo-name');

const rootPath = path.resolve(__dirname, '..', '..');
const gatsbyCliPath = path.resolve(rootPath, 'node_modules', '.bin', 'gatsby');

const gatsbyBuild = async () => {
  const cliCwd = await getCliCwd(CLI_PROCESS_NAME);

  const repoName = getRepoName.sync(cliCwd);

  const buildCmd = spawn(gatsbyCliPath, ['build', '--prefix-paths'], {
    stdio: 'inherit',
    cwd: rootPath,
    env: {
      ...process.env,
      CLI_CWD: cliCwd,
      REPO_NAME: repoName,
    },
  });

  buildCmd.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'ENOENT') {
      console.log(E_NO_GATSBY_CLI);
    }
  });
};

const gatsbyDevelop = async () => {
  const cliCwd = await getCliCwd(CLI_PROCESS_NAME);

  const repoName = getRepoName.sync(cliCwd);

  const devCmd = spawn(gatsbyCliPath, ['develop'], {
    stdio: 'inherit',
    cwd: rootPath,
    env: {
      ...process.env,
      CLI_CWD: cliCwd,
      REPO_NAME: repoName,
    },
  });

  devCmd.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'ENOENT') {
      console.log(E_NO_GATSBY_CLI);
    }
  });
};

// .git을 찾을 수 없을 때
if (!getRepoInfo().commonGitDir) {
  console.log(E_NO_GIT);
  process.exit(1);
}

switch (process.argv[2]) {
  case 'build':
    gatsbyBuild();
    break;
  case 'develop':
    gatsbyDevelop();
    break;
  default:
    console.log(E_USAGE);
}
