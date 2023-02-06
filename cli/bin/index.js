#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const git_repo_info_1 = __importDefault(require("git-repo-info"));
const getRepoName = require('git-repo-name');
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const rootPath = path_1.default.resolve(__dirname, '..', '..');
// .git을 찾을 수 없을 때
if (!(0, git_repo_info_1.default)().commonGitDir) {
    console.log(constants_1.E_NO_GIT);
    process.exit(1);
}
(async () => {
    // $ grbgen build
    if (process.argv[2] === 'build') {
        const cliCwd = await (0, utils_1.getCliCwd)();
        const buildCmd = (0, child_process_1.spawn)(path_1.default.resolve(rootPath, 'node_modules', '.bin', 'gatsby'), ['build', '--prefix-paths'], {
            stdio: 'inherit',
            cwd: rootPath,
            env: {
                ...process.env,
                PREFIX_PATHS: `/${getRepoName.sync(cliCwd)}/dist`,
            },
        });
        buildCmd.on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.log(constants_1.E_NO_GATSBY_CLI);
            }
        });
    }
    // $ grbgen develop
    else if (process.argv[2] === 'develop') {
        const devCmd = (0, child_process_1.spawn)(path_1.default.resolve(rootPath, 'node_modules', '.bin', 'gatsby'), ['develop'], {
            stdio: 'inherit',
            cwd: rootPath,
        });
        devCmd.on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.log(constants_1.E_NO_GATSBY_CLI);
            }
        });
    }
    // 잘못된 사용
    else {
        console.log(constants_1.E_USAGE);
    }
})();
