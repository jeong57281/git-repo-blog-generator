"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliCwd = exports.getCliPid = void 0;
const find_process_1 = __importDefault(require("find-process"));
const pid_cwd_1 = __importDefault(require("pid-cwd"));
const path_1 = require("path");
const constants_1 = require("../constants");
const getCliPid = async (cliName, process) => {
    // 기저 사례
    if (!process) {
        return null;
    }
    const { pid, ppid, cmd } = process;
    if (!ppid) {
        return null;
    }
    if (pid === constants_1.INIT_PROCESS_PID || pid === constants_1.SWAPPER_PROCESS_PID) {
        return null;
    }
    if (cmd.indexOf(cliName) !== -1) {
        return pid;
    }
    // 재귀 호출
    const processList = await (0, find_process_1.default)('pid', ppid);
    const ret = await (0, exports.getCliPid)(cliName, processList[0]);
    return ret;
};
exports.getCliPid = getCliPid;
const getCliCwd = async (cliName) => {
    const processList = await (0, find_process_1.default)('pid', process.pid);
    const cliPid = await (0, exports.getCliPid)(cliName, processList[0]);
    const cwd = !cliPid ? (0, path_1.join)(__dirname, '..', '..') : await (0, pid_cwd_1.default)(cliPid);
    return cwd;
};
exports.getCliCwd = getCliCwd;
