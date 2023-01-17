const path = require('path');
const fs = require('fs');
const pidCwd = require('pid-cwd');
const find = require('find-process');

const getCliPid = async () => {
  let parentPid = process.ppid;
  let parentProcessList;

  while (true) {
    parentProcessList = await find('pid', parentPid);

    if (parentProcessList.length === 0) {
      break;
    }

    parentProcess = parentProcessList[0];

    if (parentProcess.cmd.indexOf('grbgen') !== -1) {
      break;
    }

    if (!parentProcess.ppid) {
      break;
    }

    parentPid = parentProcess.ppid;
  }

  return parentPid;
};

exports.onPreInit = async ({ actions, store }) => {
  const cliPid = await getCliPid();
  const cliCwd = await pidCwd(cliPid);

  // 기존에 build된 데이터 삭제
  if (process.argv[2] === 'build') {
    const publicPath = path.join(__dirname, 'public');

    if (fs.existsSync(publicPath)) {
      fs.rmSync(publicPath, { force: true, recursive: true });
    }

    const distPath = path.join(cliCwd, 'dist');

    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { force: true, recursive: true });
    }
  }

  // gatsby-config 내 플러그인 옵션 동적으로 수정
  const { setPluginStatus } = actions;

  const state = store.getState();

  const plugin = state.flattenedPlugins.find(
    (plugin) => plugin.name === 'gatsby-source-filesystem'
  );

  if (plugin) {
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...{ path: cliCwd },
    };

    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }
};

exports.onPostBuild = async () => {
  const cliPid = await getCliPid();
  const cliCwd = await pidCwd(cliPid);

  const publicPath = path.join(__dirname, 'public');
  const distPath = path.join(cliCwd, 'dist');

  // build된 폴더(pubilc) 이름 변경하여 경로 이동
  fs.renameSync(publicPath, distPath);
};
