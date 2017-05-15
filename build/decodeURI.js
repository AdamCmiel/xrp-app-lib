'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _Number$isNaN = require('babel-runtime/core-js/number/is-nan')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _querystring = require('querystring');

var qs = _interopRequireWildcard(_querystring);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var decodeURI = (function () {
    function decodeURI() {
        _classCallCheck(this, decodeURI);
    }

    _createClass(decodeURI, [{
        key: 'decode',
        value: function decode(uri) {
            if (typeof uri !== 'string') this['throw']("uri is not a string");

            var params;
            var protocol = uri.replace(/\s/g, '').match(/^([a-z\.]+):\/\//); // host after slashes

            if (!(protocol instanceof Array && protocol.length === 2)) this['throw']("protocol not supported");
            protocol = protocol[1];

            switch (protocol) {
                case "ripple.com":
                    params = this.parseURI('ripple.com://', uri);
                    break;
                case "ripple":
                    params = this.parseURI('ripple://', uri);
                    break;
                default:
                    this['throw']("protocol not supported");
            }

            switch (params.action) {
                case 'query':
                    return this.makeQuery(params);
                case 'send':
                    return this.makeSend(params);
                    break;
                default:
                    this['throw']("this action not supported");
            }
        }
    }, {
        key: 'makeSend',
        value: function makeSend(params) {
            // Try and import the account
            if (params.to) var accountTo = new _account2['default']({ publicKey: params.to });else this['throw']();

            if (!accountTo) this['throw']();
            if (params.amount) {
                var amount = parseFloat(params.amount);
                if (_Number$isNaN(amount)) this['throw']();else params.amount = amount;
            }
            return params;
        }
    }, {
        key: 'makeQuery',
        value: function makeQuery(params) {
            new _account2['default']({ publicKey: params.address });
            return params;
        }
    }, {
        key: 'parseURI',
        value: function parseURI(scheme, uri) {
            // remove whitespace
            var parsedURI = uri.replace(/\s/g, '');
            var withoutScheme = parsedURI.substr(scheme.length);

            if (!withoutScheme.length) this['throw']();

            var parts = withoutScheme.split('?');

            // When there is no query string
            if (parts.length === 1) {
                return {
                    action: 'query',
                    address: parts[0],
                    parsedURI: parsedURI,
                    rawURI: uri
                };
            }

            // There is one query string
            else if (parts.length === 2) {
                    var out = qs.parse(parts[1]);
                    out.action = parts[0];
                    out.parsedURI = parsedURI;
                    out.rawURI = uri;
                    return out;
                } else throw new URIError();
        }
    }, {
        key: 'throw',
        value: function _throw(message) {
            throw new URIError(message);
        }
    }]);

    return decodeURI;
})();

var URIError = (function (_Error) {
    _inherits(URIError, _Error);

    function URIError(message) {
        _classCallCheck(this, URIError);

        _get(Object.getPrototypeOf(URIError.prototype), 'constructor', this).call(this, message);
        this.message = message || "Badly formatted URI";
        this.type = "URIError";
        Error.captureStackTrace(this, URIError);
    }

    return URIError;
})(Error);

exports['default'] = new decodeURI();
module.exports = exports['default'];