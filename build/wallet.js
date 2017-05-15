'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _rippleLib = require('ripple-lib');

var rippleLib = _interopRequireWildcard(_rippleLib);

var Wallet = (function (_Account) {
  _inherits(Wallet, _Account);

  function Wallet(options) {
    _classCallCheck(this, Wallet);

    _get(Object.getPrototypeOf(Wallet.prototype), 'constructor', this).call(this, {
      publicKey: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe'
    });
    var wallet;

    if (!options) {
      wallet = rippleLib.Wallet.generate();
      this._balance = 0;
    } else {
      if (options._privateKey) return new Wallet({
        privateKey: options._privateKey
      });

      if (rippleLib.Seed.is_valid(options.privateKey)) {
        var secret = options.privateKey;
        wallet = new rippleLib.Wallet(secret);
        wallet.address = wallet.getAddress().value;
        this._balance = undefined;
      } else {
        throw new _errors2['default'].InvalidPrivateKey();
      }
    }
    this._publicKey = wallet.address;
    this._privateKey = wallet.secret;
  }

  _createClass(Wallet, [{
    key: 'sendPayment',
    value: function sendPayment(options) {
      var _this = this;
      var remote = new rippleLib.Remote({
        servers: [{ host: 's1.ripple.com', port: 443, secure: true }]
      });
      return new _Promise(function (resolve, reject) {
        remote.connect(function (err, res) {
          if (err) {
            return reject(err);
          }
          remote.setSecret(_this.publicKey, _this.privateKey);

          remote.createTransaction('Payment', {
            account: _this.publicKey,
            destination: options.to.publicKey,
            amount: options.amount * 1000000
          }).submit(function (error, response) {
            remote.disconnect();
            if (error) {
              return reject(error);
            };
            resolve(response);
          });
        });
      });
    }
  }, {
    key: 'privateKey',
    get: function get() {
      return this._privateKey;
    }
  }], [{
    key: 'generate',
    value: function generate() {
      var wallet = rippleLib.Wallet.generate();
      return new Wallet({ privateKey: wallet.secret });
    }
  }]);

  return Wallet;
})(_account2['default']);

exports['default'] = Wallet;
module.exports = exports['default'];