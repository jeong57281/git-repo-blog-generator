#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');
const getRepoInfo = require('git-repo-info')();
const getRepoName = require('git-repo-name');
const { getCliCwd } = require('./src/util/process.js');

if (!getRepoInfo.commonGitDir) {
  console.log(
    `\n${chalk.bgRed(' ERROR ')}\n\n${chalk.yellow('.git')} not found\n`
  );
  process.exit(1);
}

(async () => {
  if (process.argv[2] === 'build') {
    const cliCwd = await getCliCwd();

    const buildCmd = spawn('gatsby', ['build', '--prefix-paths'], {
      stdio: 'inherit',
      cwd: __dirname,
      env: {
        ...process.env,
        PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}/dist`,
      },
    });

    buildCmd.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.log(chalk.yellow('gatsby-cli'), 'not found');
      }
    });

    process.exit(0);
  }

  if (process.argv[2] === 'develop') {
    const devCmd = spawn('gatsby', ['develop'], {
      stdio: 'inherit',
      cwd: __dirname,
    });

    devCmd.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.log(chalk.yellow('gatsby-cli'), 'not found');
      }
    });

    process.exit(0);
  }

  console.log(
    `\nusage: $ ${chalk.yellow('grbgen')} build ${chalk.gray('or')} develop\n`
  );
})();
