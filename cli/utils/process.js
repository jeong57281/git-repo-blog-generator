"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliCwd = void 0;
const find_process_1 = __importDefault(require("find-process"));
const pid_cwd_1 = __importDefault(require("pid-cwd"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const getCliCwd = async () => {
    let currentPid = process.pid;
    let currentProcess;
    let currentProcessList;
    do {
        currentProcessList = await (0, find_process_1.default)('pid', currentPid);
        currentProcess = currentProcessList[0];
        currentPid = currentProcess.ppid;
    } while (currentPid &&
        currentProcess &&
        currentProcess.cmd.indexOf(constants_1.CLI_NAME) === -1);
    return !currentPid ||
        currentPid === constants_1.INIT_PROCESS_PID ||
        currentPid === constants_1.SWAPPER_PROCESS_PID
        ? path_1.default.resolve(__dirname, '..', '..')
        : await (0, pid_cwd_1.default)(currentPid);
};
exports.getCliCwd = getCliCwd;
