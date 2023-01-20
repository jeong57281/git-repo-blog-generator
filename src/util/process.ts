const find = require('find-process');
const pidCwd = require('pid-cwd');

const CLI_NAME = 'grbgen';
const INIT_PROCESS_PID = 1;

interface findProcessReturnType {
  pid: number;
  ppid?: number;
  uid?: number;
  gid?: number;
  name: string;
  cmd: string;
}

/**
 * cli 프로그램을 찾을 수 없으면 init Process PID(1)를 반환한다.
 * @returns
 */
const getCliPid = async (): Promise<number> => {
  let parentPid: number | undefined = process.ppid;
  let parentProcess: findProcessReturnType | undefined;
  let parentProcessList: findProcessReturnType[];

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

const getCliCwd = async (): Promise<string> => {
  const cliPid = await getCliPid();

  return cliPid === INIT_PROCESS_PID ? __dirname : await pidCwd(cliPid);
};

module.exports = {
  getCliPid,
  getCliCwd,
};
