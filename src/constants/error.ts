import chalk from 'chalk';

export const E_NO_GIT = `
  ${chalk.bgRed(' ERROR ')}
  ${chalk.yellow('.git')} not found
`;

export const E_NO_GATSBY_CLI = `
  ${chalk.yellow('gatsby-cli')} 'not found'
`;

export const E_USAGE = `
  usage: $ ${chalk.yellow('grbgen')} build ${chalk.gray('or')} develop
`;
