import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    siteName: `Using TypeScript`,
    sourceUrl: `https://github.com/gatsbyjs/gatsby/tree/master/examples/using-typescript`,
  },

  pathPrefix: `/${process.env.REPO_NAME}`,

  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: __dirname,
        ignore: [`**/.*`, `node_modules`, `public`, `docs`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: `${__dirname}/src/components/Layout`,
      },
    },
    {
      resolve: `gatsby-plugin-global-context`,
      options: {
        context: {
          repoName: '',
        },
      },
    },
  ],
};

export default config;
