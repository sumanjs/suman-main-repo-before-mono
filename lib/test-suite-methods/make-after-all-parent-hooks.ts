'use strict';
import {ITestSuite} from "../../dts/test-suite";
import {ISuman} from "../../dts/suman";
import {IAfterFn, IAfterObj, IAfterOpts} from "../../dts/after";

//polyfills
const process = require('suman-browser-polyfills/modules/process');
const global = require('suman-browser-polyfills/modules/global');

//npm
const pragmatik = require('pragmatik');
import * as chalk from 'chalk';
import su from 'suman-utils';

//project
const _suman = global.__suman = (global.__suman || {});
const rules = require('../helpers/handle-varargs');
const {constants} = require('../../config/suman-constants');
const handleSetupComplete = require('../handle-setup-complete');
import evalOptions from '../helpers/eval-options';
import parseArgs from '../helpers/parse-pragmatik-args';

///////////////////////////////////////////////////////////////////////////////////////

function handleBadOptions(opts: IAfterOpts): void {

  if (opts.plan !== undefined && !Number.isInteger(opts.plan)) {
    console.error(' => Suman usage error => "plan" option is not an integer.');
    process.exit(constants.EXIT_CODES.OPTS_PLAN_NOT_AN_INTEGER);
    return;
  }
}

////////////////////////////////////////////////////////////////////////////

export const makeAfterAllParentHooks = function (suman: ISuman, zuite: ITestSuite): IAfterFn {

  return function ($desc: string, $opts: IAfterOpts): ITestSuite {

    handleSetupComplete(zuite, 'after');

    const args = pragmatik.parse(arguments, rules.hookSignature, {
      preParsed: su.isObject($opts) ? $opts.__preParsed : null
    });

    // this transpiles much more nicely, rather than inlining it above
    const vetted = parseArgs(args);
    const [desc, opts, fn] = vetted.args;
    const arrayDeps = vetted.arrayDeps;
    handleBadOptions(opts);

    if (arrayDeps.length > 0) {
      evalOptions(arrayDeps, opts);
    }

    if (opts.skip) {
      suman.numHooksSkipped++;
    }
    else if (!fn) {
      suman.numHooksStubbed++;
    }
    else {

      let obj: IAfterObj = {
        ctx: zuite,
        timeout: opts.timeout || 11000,
        desc: desc || fn.name,
        cb: opts.cb || false,
        throws: opts.throws,
        always: opts.always,
        last: opts.last,
        planCountExpected: opts.plan,
        fatal: !(opts.fatal === false),
        fn: fn,
        type: 'after/teardown',
        warningErr: new Error('SUMAN_TEMP_WARNING_ERROR')
      };

      zuite.getAfterAllParentHooks().push(obj);

    }

    return zuite;

  };

};



