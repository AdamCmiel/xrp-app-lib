'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var XError = (function (_Error) {
    _inherits(XError, _Error);

    function XError(message) {
        _classCallCheck(this, XError);

        _get(Object.getPrototypeOf(XError.prototype), 'constructor', this).call(this, message);
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }

    return XError;
})(Error);

var InvalidPrivateKey = (function (_Error2) {
    _inherits(InvalidPrivateKey, _Error2);

    function InvalidPrivateKey(message) {
        _classCallCheck(this, InvalidPrivateKey);

        _get(Object.getPrototypeOf(InvalidPrivateKey.prototype), 'constructor', this).call(this, message);
        this.type = 'InvalidPrivateKey';
    }

    return InvalidPrivateKey;
})(Error);

var InvalidPublicKey = (function (_Error3) {
    _inherits(InvalidPublicKey, _Error3);

    function InvalidPublicKey(message) {
        _classCallCheck(this, InvalidPublicKey);

        _get(Object.getPrototypeOf(InvalidPublicKey.prototype), 'constructor', this).call(this, message);
        this.type = 'InvalidPublicKey';
    }

    return InvalidPublicKey;
})(Error);

exports['default'] = {
    InvalidPrivateKey: InvalidPrivateKey,
    InvalidPublicKey: InvalidPublicKey
};
module.exports = exports['default'];