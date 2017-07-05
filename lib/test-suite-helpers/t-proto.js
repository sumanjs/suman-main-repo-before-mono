'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var process = require('suman-browser-polyfills/modules/process');
var global = require('suman-browser-polyfills/modules/global');
var util = require('util');
var EE = require('events');
var chai = require('chai');
var freeze_existing_props_1 = require("freeze-existing-props");
var _suman = global.__suman = (global.__suman || {});
var $proto = Object.create(Function.prototype);
var proto = Object.create(Object.assign($proto, EE.prototype));
proto.wrap = function _wrap(fn) {
    var self = this;
    return function () {
        try {
            return fn.apply(this, arguments);
        }
        catch (e) {
            return self.__handle(e, false);
        }
    };
};
proto.wrapErrorFirst = proto.wrapErrFirst = function (fn) {
    var self = this;
    return function (err) {
        if (err) {
            return self.__handle(err, false);
        }
        try {
            return fn.apply(this, Array.from(arguments).slice(1));
        }
        catch (e) {
            return self.__handle(e, false);
        }
    };
};
proto.log = function _log() {
    _suman._writeLog.apply(null, arguments);
};
proto.slow = function _slow() {
    this.timeout(20000);
};
exports.tProto = freeze_existing_props_1.freezeExistingProps(proto);