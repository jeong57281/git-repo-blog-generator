import find from 'find-process';
import pidCwd from 'pid-cwd';
import path from 'path';

import { CLI_NAME, INIT_PROCESS_PID, SWAPPER_PROCESS_PID } from '../constants';

interface findProcessReturnType {
  pid: number;
  ppid?: number;
  uid?: number;
  gid?: number;
  name: string;
  cmd: string;
}

export const getCliCwd = async () => {
  let currentPid: number | undefined = process.pid;

  let currentProcess: findProcessReturnType | undefined;

  let currentProcessList: findProcessReturnType[];

  do {
    currentProcessList = await find('pid', currentPid);

    currentProcess = currentProcessList[0];

    currentPid = currentProcess.ppid;
  } while (
    currentPid &&
    currentProcess &&
    currentProcess.cmd.indexOf(CLI_NAME) === -1
  );

  return !currentPid ||
    currentPid === INIT_PROCESS_PID ||
    currentPid === SWAPPER_PROCESS_PID
    ? path.resolve(__dirname, '..', '..')
    : await pidCwd(currentPid);
};
