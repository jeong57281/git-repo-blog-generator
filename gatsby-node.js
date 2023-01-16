const path = require('path');
const fs = require('fs');
const pidCwd = require('pid-cwd');

exports.onPreInit = async () => {
  if (process.argv[2] !== 'build') {
    return;
  }

  const publicPath = path.join(__dirname, 'public');

  if (fs.existsSync(publicPath)) {
    fs.rmSync(publicPath, { force: true, recursive: true });
  }

  const parentCwd = await pidCwd(process.ppid);
  const distPath = path.join(parentCwd, 'dist');

  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { force: true, recursive: true });
  }
};

exports.onPostBuild = async () => {
  const parentCwd = await pidCwd(process.ppid);

  const publicPath = path.join(__dirname, 'public');
  const distPath = path.join(parentCwd, 'dist');

  fs.renameSync(publicPath, distPath);
};
