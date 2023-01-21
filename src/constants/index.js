const chalk = require('chalk');

const E_NO_GIT = `
  ${chalk.bgRed(' ERROR ')}

  ${chalk.yellow('.git')} not found
`;

const E_NO_GATSBY_CLI = `
  ${chalk.yellow('gatsby-cli')} 'not found'
`;

const E_USAGE = `
  usage: $ ${chalk.yellow('grbgen')} build ${chalk.gray('or')} develop
`;

const CLI_NAME = 'grbgen';

const INIT_PROCESS_PID = 1;

const SWAPPER_PROCESS_PID = 0;

module.exports = {
  E_NO_GIT,
  E_NO_GATSBY_CLI,
  E_USAGE,
  CLI_NAME,
  INIT_PROCESS_PID,
  SWAPPER_PROCESS_PID,
};
