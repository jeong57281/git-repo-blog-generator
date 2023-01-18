const path = require('path');
const fs = require('fs');
const pidCwd = require('pid-cwd');
const find = require('find-process');
const gitDateExtractor = require('git-date-extractor');

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

  /**
   * cli 프로그램의 pid값이 1이라는 것은 cli 프로그램을 찾지 못하여
   * 모든 프로세스의 공통 부모인 init 프로세의 pid 값이 반환된 경우이므로
   * 현재 작업 디렉토리를 __dirname 로 설정
   */
  const cliCwd = cliPid === 1 ? __dirname : await pidCwd(cliPid);

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

  /**
   * gatsby-config.js 플러그인 옵션 동적으로 수정
   */

  let plugin;

  const state = store.getState();

  const { setPluginStatus } = actions;

  // gatsby-source-filesystem 플러그인 옵션 수정
  plugin = state.flattenedPlugins.find(
    (plugin) => plugin.name === 'gatsby-source-filesystem'
  );

  if (plugin) {
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...{ path: cliCwd },
    };

    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }

  // gatsby-plugin-global-context 플러그인 옵션 수정
  plugin = state.flattenedPlugins.find(
    (plugin) => plugin.name === 'gatsby-plugin-global-context'
  );

  if (plugin) {
    const stamps = await gitDateExtractor.getStamps({
      projectRootPath: cliCwd,
    });

    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      context: {
        stamps,
      },
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
