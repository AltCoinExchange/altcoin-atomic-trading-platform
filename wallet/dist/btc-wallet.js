'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BtcWallet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config/config');

var _config2 = require('../../btcatomicswap/src/config/config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mnemonic = require('bitcore-mnemonic');
var bitcore = require('bitcore');
var HDPrivateKey = bitcore.HDPrivateKey;
var PrivateKey = bitcore.PrivateKey;

var BtcWallet = exports.BtcWallet = function () {
  function BtcWallet(code) {
    var regenerate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, BtcWallet);

    if (regenerate === true) {
      this.hdPrivateKey = new HDPrivateKey(code);
    } else {
      var valid = Mnemonic.isValid(code);
      if (!valid) {
        throw Error('Not valid mnemonic code');
      }
      this.code = new Mnemonic(code);
    }
    this.derived = {};
    this.addressess = {};
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
      if (!this.hdPrivateKey) {
        throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
      }
      var derived = this.hdPrivateKey.derive(deriveArg);
      this.derived[deriveArg] = derived;
      return derived;
    }
  }, {
    key: 'generateAddress',
    value: function generateAddress(hdPublicKey) {
      if (!hdPublicKey) {
        throw new Error('hdPublicKey required to generate address');
      }
      var address = hdPublicKey.publicKey.toAddress();
      this.addressess[hdPublicKey] = address;
      return address;
    }
  }, {
    key: 'generateAddressFromWif',
    value: function generateAddressFromWif(wif) {
      var WIF = new PrivateKey(wif);
      return WIF.toPublicKey().toAddress(_config2.configuration.network);
    }
  }, {
    key: 'getDerived',
    value: function getDerived() {
      return this.derived;
    }
  }]);

  return BtcWallet;
}();