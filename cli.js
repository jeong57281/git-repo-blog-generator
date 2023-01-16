#!/usr/bin/env node

const { spawn } = require('child_process');

spawn('gatsby', ['build', '--prefix-paths'], { stdio: 'inherit', cwd: __dirname });
