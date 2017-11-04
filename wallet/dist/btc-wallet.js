'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BtcWallet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config/config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = require('bitcore').Address;
var Mnemonic = require('bitcore-mnemonic');

var BtcWallet = exports.BtcWallet = function () {
  function BtcWallet(code) {
    _classCallCheck(this, BtcWallet);

    var valid = Mnemonic.isValid(code);
    if (!valid) {
      throw Error('Not valid mnemomic');
    }
    this.code = new Mnemonic(code);
    this.hdPrivateKeys = [];
    this.derived = [];
    this.addressess = [];
  }

  _createClass(BtcWallet, [{
    key: 'generateHDPrivateKey',
    value: function generateHDPrivateKey(passPhrase) {
      this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, _config.btcRpcConfiguration.network);
      return this.hdPrivateKey;
    }
  }, {
    key: 'deriveHdPrivateKey',
    value: function deriveHdPrivateKey(deriveArg) {
      this.derived.push(deriveArg);
      var derived = this.hdPrivateKey.derive(deriveArg);
      this.hdPrivateKeys.push(derived);
      return derived;
    }
  }, {
    key: 'generateAddress',
    value: function generateAddress(hdPublicKey) {
      return hdPublicKey.publicKey.toAddress();
    }
  }, {
    key: 'getHdPkeys',
    value: function getHdPkeys() {
      return this.hdPrivateKeys;
    }
  }, {
    key: 'getDeriveArgs',
    value: function getDeriveArgs() {
      return this.derived;
    }
  }]);

  return BtcWallet;
}();