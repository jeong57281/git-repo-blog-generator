// @ts-check

const find = require('find-process');
const pidCwd = require('pid-cwd');

const CLI_NAME = 'grbgen';
const INIT_PROCESS_PID = 1;

/**
 * cli 프로그램을 찾을 수 없으면 init Process PID(1)를 반환한다.
 * @returns
 */
const getCliPid = async () => {
  /** @type { number | undefined } */
  let parentPid = process.ppid;

  /** @type { import('../types/index').findProcessReturnType | undefined } */
  let parentProcess;

  /** @type { import('../types/index').findProcessReturnType[] } */
  let parentProcessList;

  // prettier-ignore
  for (
    parentProcessList = await find('pid', parentPid),
      parentProcess = parentProcessList[0]
    ; parentPid && parentProcess && parentProcess.cmd.indexOf(CLI_NAME) === -1
    ;
  ) {
    parentPid = parentProcess.ppid;
  }

  return parentPid || INIT_PROCESS_PID;
};

const getCliCwd = async () => {
  const cliPid = await getCliPid();

  return cliPid === INIT_PROCESS_PID ? __dirname : await pidCwd(cliPid);
};

module.exports = {
  getCliPid,
  getCliCwd,
};
