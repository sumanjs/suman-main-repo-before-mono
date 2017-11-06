'use strict';

//dts
import {IGlobalSumanObj, IPseudoError} from "suman-types/dts/global";

//polyfills
const process = require('suman-browser-polyfills/modules/process');
const global = require('suman-browser-polyfills/modules/global');

//core
import util = require('util');

//npm
const flattenDeep = require('lodash.flattendeep');

//project
const _suman : IGlobalSumanObj = global.__suman = (global.__suman || {});
import * as oncePost from '../once-post';

/////////////////////////////////////////////////////////////////////////

let oncePostInvoked = false;

export const oncePostFn = function (cb: Function) {

  if (!oncePostInvoked) {
    oncePostInvoked = true;

    oncePost.run(_suman.oncePostKeys, _suman.userData, function (err: IPseudoError, results: Array<any>) {
      if (err) {
        _suman.log.error(err.stack || err);
      }
      if (Array.isArray(results)) {  // once-post was actually run this time versus (see below)
        results.filter(r => r).forEach(function (r) {
          _suman.log.error(r.stack || r);
        });
      }
      else if (results) {
        _suman.log.error('Suman implemenation warning: results is not an array...', util.inspect(results));
      }
      process.nextTick(cb);
    });
  }

  else {
    process.nextTick(cb, new Error('Suman warning => oncePostFn was called more than once =>'));
  }

};
