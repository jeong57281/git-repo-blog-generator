#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const git_repo_info_1 = __importDefault(require("git-repo-info"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const getRepoName = require('git-repo-name');
const rootPath = path_1.default.resolve(__dirname, '..', '..');
const gatsbyCliPath = path_1.default.resolve(rootPath, 'node_modules', '.bin', 'gatsby');
const gatsbyBuild = async () => {
    const cliCwd = await (0, utils_1.getCliCwd)(constants_1.CLI_PROCESS_NAME);
    const buildCmd = (0, child_process_1.spawn)(gatsbyCliPath, ['build', '--prefix-paths'], {
        stdio: 'inherit',
        cwd: rootPath,
        env: {
            ...process.env,
            PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}`,
            CLI_CWD: cliCwd,
        },
    });
    buildCmd.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log(constants_1.E_NO_GATSBY_CLI);
        }
    });
};
const gatsbyDevelop = async () => {
    const devCmd = (0, child_process_1.spawn)(gatsbyCliPath, ['develop'], {
        stdio: 'inherit',
        cwd: rootPath,
    });
    devCmd.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log(constants_1.E_NO_GATSBY_CLI);
        }
    });
};
// .git을 찾을 수 없을 때
if (!(0, git_repo_info_1.default)().commonGitDir) {
    console.log(constants_1.E_NO_GIT);
    process.exit(1);
}
switch (process.argv[2]) {
    case 'build':
        gatsbyBuild();
        break;
    case 'develop':
        gatsbyDevelop();
        break;
    default:
        console.log(constants_1.E_USAGE);
}
