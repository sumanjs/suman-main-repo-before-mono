'use strict';

//polyfills
const process = require('suman-browser-polyfills/modules/process');
const global = require('suman-browser-polyfills/modules/global');

//core
const fs = require('fs');
const path = require('path');

//npm
import * as chalk from 'chalk';
const {events} = require('suman-events');
const sumanUtils = require('suman-utils');

//project
const _suman = global.__suman = (global.__suman || {});
const resultBroadcaster = _suman.resultBroadcaster = (_suman.resultBroadcaster || new EE());

////////////////////////////////////////////////////////////////////////////////////////

module.exports = function onExit(code) {

  if (code > 0) {
    //make a beep noise if a failing run
    resultBroadcaster.emit(String(events.RUNNER_EXIT_CODE_GREATER_THAN_ZERO), code);
  }
  else {
    resultBroadcaster.emit(String(events.RUNNER_EXIT_CODE_IS_ZERO));
  }

  if (code > 0) {

    const logsDir = _suman.sumanConfig.logsDir || _suman.sumanHelperDirRoot + '/logs';
    const sumanCPLogs = path.resolve(logsDir + '/runs/');

    const logsPath = path.resolve(sumanCPLogs + '/' + _suman.timestamp + '-' + _suman.runId);
    console.log('\n', ' => At least one test experienced an error => View the test logs => ',
      '\n', chalk.yellow.bold(logsPath), '\n');
  }

  resultBroadcaster.emit(String(events.RUNNER_EXIT_CODE), code);

  //write synchronously to ensure it gets written
  fs.appendFileSync(_suman.sumanRunnerStderrStreamPath, '\n\n\n### Suman runner end ###\n\n\n\n\n');

};