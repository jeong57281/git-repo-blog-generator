#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');
const getRepoInfo = require('git-repo-info');

const info = getRepoInfo();

if (!info.commonGitDir) {
  console.log(
    `\n${chalk.bgRed(' ERROR ')}\n\n${chalk.yellow('.git')} not found\n`
  );
  process.exit(1);
}

if (process.argv[2] === 'build') {
  const buildCmd = spawn('gatsby', ['build', '--prefix-paths'], {
    stdio: 'inherit',
    cwd: __dirname,
  });

  buildCmd.on('error', (err) => {
    if (err.code === 'ENOENT') {
      console.log(chalk.yellow('gatsby-cli'), 'not found');
    }
  });
} else if (process.argv[2] === 'develop') {
  const devCmd = spawn('gatsby', ['develop'], {
    stdio: 'inherit',
    cwd: __dirname,
  });

  devCmd.on('error', (err) => {
    if (err.code === 'ENOENT') {
      console.log(chalk.yellow('gatsby-cli'), 'not found');
    }
  });
} else {
  console.log(
    `\nusage: $ ${chalk.yellow('grbgen')} build ${chalk.gray('or')} develop\n`
  );
}
