// @ts-check

const find = require('find-process');
const pidCwd = require('pid-cwd');
const path = require('path');

const CLI_NAME = 'grbgen';
const INIT_PROCESS_PID = 1;
const SWAPPER_PROCESS_PID = 0;

const getCliCwd = async () => {
  /** @type { number | undefined } */
  let parentPid = process.ppid;

  /** @type { import('../types/index').findProcessReturnType | undefined } */
  let parentProcess;

  /** @type { import('../types/index').findProcessReturnType[] } */
  let parentProcessList;

  do {
    parentProcessList = await find('pid', parentPid);

    parentProcess = parentProcessList[0];

    parentPid = parentProcess.ppid;
  } while (
    parentPid &&
    parentProcess &&
    parentProcess.cmd.indexOf(CLI_NAME) === -1
  );

  return parentPid === INIT_PROCESS_PID || parentPid === SWAPPER_PROCESS_PID
    ? path.resolve(__dirname, '..', '..')
    : await pidCwd(parentPid);
};

module.exports = {
  getCliCwd,
};
