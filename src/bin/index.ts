#!/usr/bin/env node

import path from 'path';
import { spawn } from 'child_process';
import getRepoInfo from 'git-repo-info';
const getRepoName = require('git-repo-name');

import { E_NO_GIT, E_NO_GATSBY_CLI, E_USAGE } from '../constants';
import { getCliCwd } from '../utils';

const rootPath = path.resolve(__dirname, '..', '..');

// .git을 찾을 수 없을 때
if (!getRepoInfo().commonGitDir) {
  console.log(E_NO_GIT);
  process.exit(1);
}

(async () => {
  // $ grbgen build
  if (process.argv[2] === 'build') {
    const cliCwd = await getCliCwd();

    const buildCmd = spawn(
      path.resolve(rootPath, 'node_modules', '.bin', 'gatsby'),
      ['build', '--prefix-paths'],
      {
        stdio: 'inherit',
        cwd: rootPath,
        env: {
          ...process.env,
          PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}/dist`,
        },
      }
    );

    buildCmd.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') {
        console.log(E_NO_GATSBY_CLI);
      }
    });
  }
  // $ grbgen develop
  else if (process.argv[2] === 'develop') {
    const devCmd = spawn(
      path.resolve(rootPath, 'node_modules', '.bin', 'gatsby'),
      ['develop'],
      {
        stdio: 'inherit',
        cwd: rootPath,
      }
    );

    devCmd.on('error', (err: NodeJS.ErrnoException) => {
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
