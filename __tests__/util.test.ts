import find from 'find-process';
import { getCliPid } from '../src/utils';
import { CLI_PROCESS_NAME, TEST_PROCESS_NAME } from '../src/constants';

test('CLI 프로세스를 찾을 수 없는 경우', async () => {
  const pList = await find('pid', process.pid);

  const cliPid = await getCliPid(CLI_PROCESS_NAME, pList[0]);

  expect(cliPid).toEqual(null);
});

test('CLI 프로세스를 찾은 경우', async () => {
  const pList = await find('pid', process.pid);

  const cliPid = await getCliPid(TEST_PROCESS_NAME, pList[0]);

  expect(cliPid).toEqual(process.pid);
});
