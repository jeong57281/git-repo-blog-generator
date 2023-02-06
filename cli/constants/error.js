"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.E_USAGE = exports.E_NO_GATSBY_CLI = exports.E_NO_GIT = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.E_NO_GIT = `
  ${chalk_1.default.bgRed(' ERROR ')}
  ${chalk_1.default.yellow('.git')} not found
`;
exports.E_NO_GATSBY_CLI = `
  ${chalk_1.default.yellow('gatsby-cli')} 'not found'
`;
exports.E_USAGE = `
  usage: $ ${chalk_1.default.yellow('grbgen')} build ${chalk_1.default.gray('or')} develop
`;
