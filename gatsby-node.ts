import fs from 'fs';
import { join, resolve } from 'path';
import type { StampObject } from 'git-date-extractor/dist/types';
import gitDateExtractor from 'git-date-extractor';
import { createFilePath } from 'gatsby-source-filesystem';
import type {
  CreatePagesArgs,
  CreateNodeArgs,
  CreateWebpackConfigArgs,
  PreInitArgs,
} from 'gatsby';
import get from 'lodash/get';
import { getCliCwd, setPluginOptionsDynamically } from './src/utils';
import { CLI_PROCESS_NAME } from './src/constants';

let cliCwd: string | undefined = process.env.CLI_CWD;

let stamps: Map<string, StampObject> | null = null;

export const onPreInit = async ({ actions, store }: PreInitArgs) => {
  if (!cliCwd) {
    cliCwd = await getCliCwd(CLI_PROCESS_NAME);
  }

  // 기존에 build된 데이터 삭제
  if (process.argv[2] === 'build') {
    const publicPath = join(__dirname, 'public');

    if (fs.existsSync(publicPath)) {
      fs.rmSync(publicPath, { force: true, recursive: true });
    }

    const docsPath = join(cliCwd, 'docs');

    if (fs.existsSync(docsPath)) {
      fs.rmSync(docsPath, { force: true, recursive: true });
    }
  }

  // gatsby-config.js 플러그인 옵션 동적으로 수정
  setPluginOptionsDynamically(actions, store, 'gatsby-source-filesystem', {
    path: cliCwd,
  });

  // 저장소 이름을 전역 컨텍스트로 공유하도록 플러그인 옵션 동적으로 수정
  setPluginOptionsDynamically(actions, store, 'gatsby-plugin-global-context', {
    context: {
      repoName: process.env.REPO_NAME || '[저장소 이름]',
    },
  });

  // git이 추적하는 모든 파일의 생성/수정 정보를 가져와 저장
  if (!stamps) {
    stamps = new Map(
      Object.entries(
        await gitDateExtractor.getStamps({
          projectRootPath: cliCwd,
        })
      )
    );
  }
};

export const onPostBuild = async () => {
  const publicPath = join(__dirname, 'public');
  const docsPath = join(cliCwd || __dirname, 'docs');

  // build된 폴더(pubilc) 이름 변경하여 경로 이동
  fs.renameSync(publicPath, docsPath);
};

export const onCreateNode = async ({
  node,
  actions,
  getNode,
  loadNodeContent,
}: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    /**
     * slug 는 relativePath 이고,
     * createFilePath 로 생성된 경로는 '/'로 시작하고 파일 확장자가 생략되어 있는 형태임
     */
    let slug = createFilePath({ node, getNode, trailingSlash: false });

    if (slug[0] === '/') {
      slug = slug.slice(1);
    }

    createNodeField({ node, name: 'slug', value: slug });
  }

  if (node.internal.type === 'File') {
    if (typeof node.relativePath === 'string') {
      const stampObject = stamps?.get(node.relativePath);

      if (stampObject) {
        createNodeField({
          node,
          name: 'stampObject',
          value: stampObject,
        });
      }
    }

    const content = await loadNodeContent(node);

    createNodeField({
      node,
      name: 'content',
      value: content,
    });
  }
};

interface FileNodeType {
  node: {
    relativePath: string;
    relativeDirectory: string;
    name: string;
  };
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allFile(filter: { ext: { ne: ".md" } }) {
        edges {
          node {
            relativePath
            relativeDirectory
            name
          }
        }
      }
    }
  `);

  const edges = get(result, 'data.allFile.edges', []);

  edges.forEach((value: FileNodeType) => {
    const { node } = value;

    const { relativePath, relativeDirectory, name } = node;

    createPage({
      path: join('post', relativeDirectory, name),
      component: resolve('./src/templates/post.tsx'),
      context: {
        slug: relativePath,
        slugNoExt: join(relativeDirectory, name),
      },
    });
  });
};

export const onCreateWebpackConfig = ({
  actions,
  loaders,
  getConfig,
}: CreateWebpackConfigArgs) => {
  const config = getConfig();

  // 절대경로 Webpack 설정
  config.resolve.alias = {
    ...config.resolve.alias,
    '@assets': resolve(__dirname, 'src/assets'),
    '@components': resolve(__dirname, 'src/components'),
    '@hooks': resolve(__dirname, 'src/hooks'),
    '@constants': resolve(__dirname, 'src/constants'),
    '@store': resolve(__dirname, 'src/store'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@styles': resolve(__dirname, 'src/styles'),
  };

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

  const testRegExp = /\.(js|mjs|jsx)$/;

  const newTestRule = {
    test: testRegExp,
    exclude: (modulePath) => {
      if (/\.cache/.test(modulePath)) {
        return false;
      }

      return /node_modules/.test(modulePath);
    },
  };

  config.module.rules = [
    ...config.module.rules.filter(
      (rule) => String(rule.test) !== String(testRegExp)
    ),
    {
      ...loaders.js(),
      ...newTestRule,
    },
  ];

  actions.replaceWebpackConfig(config);
};
