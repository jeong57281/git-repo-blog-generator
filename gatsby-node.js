const fs = require('fs');
const path = require('path');
const gitDateExtractor = require('git-date-extractor');

const { getCliCwd } = require('./src/util/process.js');
const { setPluginOptionsDynamically } = require('./src/util/gatsby.js');

exports.onPreInit = async ({ actions, store }) => {
  const cliCwd = await getCliCwd();

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

  // gatsby-config.js 플러그인 옵션 동적으로 수정
  setPluginOptionsDynamically(actions, store, 'gatsby-source-filesystem', {
    path: cliCwd,
  });
  setPluginOptionsDynamically(actions, store, 'gatsby-plugin-global-context', {
    context: {
      stamps: await gitDateExtractor.getStamps({
        projectRootPath: cliCwd,
      }),
    },
  });
};

exports.onPostBuild = async () => {
  const cliCwd = await getCliCwd();

  const publicPath = path.join(__dirname, 'public');
  const distPath = path.join(cliCwd, 'dist');

  // build된 폴더(pubilc) 이름 변경하여 경로 이동
  fs.renameSync(publicPath, distPath);
};
