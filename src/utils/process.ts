import find from 'find-process';
import pidCwd from 'pid-cwd';
import { join } from 'path';

import { INIT_PROCESS_PID, SWAPPER_PROCESS_PID } from '../constants';

interface findProcessReturnType {
  pid: number;
  ppid?: number;
  uid?: number;
  gid?: number;
  name: string;
  cmd: string;
}

export const getCliPid = async (
  cliName: string,
  process: findProcessReturnType | undefined
): Promise<number | null> => {
  // 기저 사례
  if (!process) {
    return null;
  }

  const { pid, ppid, cmd } = process;

  if (!ppid) {
    return null;
  }

  if (pid === INIT_PROCESS_PID || pid === SWAPPER_PROCESS_PID) {
    return null;
  }

  if (cmd.indexOf(cliName) !== -1) {
    return pid;
  }

  // 재귀 호출
  const processList: findProcessReturnType[] = await find('pid', ppid);

  const ret = await getCliPid(cliName, processList[0]);

  return ret;
};

export const getCliCwd = async (cliName: string): Promise<string> => {
  const processList: findProcessReturnType[] = await find('pid', process.pid);

  const cliPid = await getCliPid(cliName, processList[0]);

  const cwd = !cliPid ? join(__dirname, '..', '..') : await pidCwd(cliPid);

  return cwd;
};
