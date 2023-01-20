#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');

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
