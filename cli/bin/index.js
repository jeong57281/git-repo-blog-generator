#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const git_repo_info_1 = __importDefault(require("git-repo-info"));
const error_1 = require("../constants/error");
const process_1 = require("../constants/process");
const process_2 = require("../utils/process");
const getRepoName = require('git-repo-name');
const rootPath = path_1.default.resolve(__dirname, '..', '..');
const gatsbyCliPath = path_1.default.resolve(rootPath, 'node_modules', '.bin', 'gatsby');
const gatsbyBuild = async () => {
    const cliCwd = await (0, process_2.getCliCwd)(process_1.CLI_PROCESS_NAME);
    const repoName = getRepoName.sync(cliCwd);
    const buildCmd = (0, child_process_1.spawn)(gatsbyCliPath, ['build', '--prefix-paths'], {
        stdio: 'inherit',
        cwd: rootPath,
        env: {
            ...process.env,
            CLI_CWD: cliCwd,
            REPO_NAME: repoName,
        },
    });
    buildCmd.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log(error_1.E_NO_GATSBY_CLI);
        }
    });
};
const gatsbyDevelop = async () => {
    const cliCwd = await (0, process_2.getCliCwd)(process_1.CLI_PROCESS_NAME);
    const repoName = getRepoName.sync(cliCwd);
    const devCmd = (0, child_process_1.spawn)(gatsbyCliPath, ['develop'], {
        stdio: 'inherit',
        cwd: rootPath,
        env: {
            ...process.env,
            CLI_CWD: cliCwd,
            REPO_NAME: repoName,
        },
    });
    devCmd.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log(error_1.E_NO_GATSBY_CLI);
        }
    });
};
// .git을 찾을 수 없을 때
if (!(0, git_repo_info_1.default)().commonGitDir) {
    console.log(error_1.E_NO_GIT);
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
        console.log(error_1.E_USAGE);
}
