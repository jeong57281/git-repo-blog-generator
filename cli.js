#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');

const buildCmd = spawn('gatsby', ['build', '--prefix-paths'], {
  stdio: 'inherit',
  cwd: __dirname,
});

buildCmd.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.log(chalk.yellow('gatsby-cli'), 'not found');
  }
});

/*
spawn('gatsby', ['develop'], {
  stdio: 'inherit',
  cwd: __dirname,
});
*/
