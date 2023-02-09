#!/usr/bin/env node

import path from 'path';
import { spawn } from 'child_process';
import getRepoInfo from 'git-repo-info';
const getRepoName = require('git-repo-name');

import { E_NO_GIT, E_NO_GATSBY_CLI, E_USAGE } from '../constants';
import { getCliCwd } from '../utils';

const rootPath = path.resolve(__dirname, '..', '..');
const gatsbyCliPath = path.resolve(rootPath, 'node_modules', '.bin', 'gatsby');

const gatsbyBuild = async () => {
  const cliCwd = await getCliCwd();

  const buildCmd = spawn(gatsbyCliPath, ['build', '--prefix-paths'], {
    stdio: 'inherit',
    cwd: rootPath,
    env: {
      ...process.env,
      PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}/dist`,
      CLI_CWD: cliCwd,
    },
  });

  buildCmd.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'ENOENT') {
      console.log(E_NO_GATSBY_CLI);
    }
  });
};

const gatsbyDevelop = async () => {
  const devCmd = spawn(gatsbyCliPath, ['develop'], {
    stdio: 'inherit',
    cwd: rootPath,
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
