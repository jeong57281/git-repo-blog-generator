module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript blog Starter`,
    description: `A simple blog starter using Typescript in front & back side with eslint & prettier.`,
    author: {
      name: `Christian`,
      content: `I like build some things using TypeScript`,
    },
    social: {
      github: `https://github.com/Lindeneg`,
    },
  },
  pathPrefix: process.env.PREFIX_PATHS,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {},
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: __dirname,
        ignore: [`**/\.*`, `node_modules`, `public`, `dist`],
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/index.tsx`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
