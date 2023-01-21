// @ts-check

const find = require('find-process');
const pidCwd = require('pid-cwd');
const path = require('path');
const {
  CLI_NAME,
  INIT_PROCESS_PID,
  SWAPPER_PROCESS_PID,
} = require('../constants');

const getCliCwd = async () => {
  /** @type { number | undefined } */
  let currentPid = process.pid;

  /** @type { import('../types/index').findProcessReturnType | undefined } */
  let currentProcess;

  /** @type { import('../types/index').findProcessReturnType[] } */
  let currentProcessList;

  do {
    currentProcessList = await find('pid', currentPid);

    currentProcess = currentProcessList[0];

    currentPid = currentProcess.ppid;
  } while (
    currentPid &&
    currentProcess &&
    currentProcess.cmd.indexOf(CLI_NAME) === -1
  );

  return currentPid === INIT_PROCESS_PID || currentPid === SWAPPER_PROCESS_PID
    ? path.resolve(__dirname, '..', '..')
    : await pidCwd(currentPid);
};

module.exports = {
  getCliCwd,
};
