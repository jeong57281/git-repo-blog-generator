const fs = require('fs');
const path = require('path');
const gitDateExtractor = require('git-date-extractor');

const { getCliCwd } = require('./src/util/process.js');
const { setPluginOptionsDynamically } = require('./src/util/gatsby.js');

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();

  /**
   * 해당 패키지는 패키지에 포함된 소스와 gatsby를 이용하여 빌드하기 때문에
   * node_modules 폴더 내에 public 과 .cache 폴더가 생겨난다.
   *
   * 그 중 .cache 폴더 내 파일들은 babel에 의해 transpile 되어야 하는데,
   * gatsby의 webpack babel 설정에는 경로에 node_modules가 포함되어 있으면
   * tranpiling 대상에서 제외되어 빌드 오류가 발생한다.
   *
   * webpack config를 수정하여 .cache 내의 파일들도 transpiling 되도록 한다.
   */
  config.module.rules = [
    ...config.module.rules.filter(
      (rule) => String(rule.test) !== String(/\.(js|mjs|jsx)$/)
    ),
    {
      ...loaders.js(),
      test: /\.(js|mjs|jsx)$/,
      exclude: function (modulePath) {
        if (/\.cache/.test(modulePath)) {
          return false;
        }

        return /node_modules/.test(modulePath);
      },
    },
  ];

  actions.replaceWebpackConfig(config);
};

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
