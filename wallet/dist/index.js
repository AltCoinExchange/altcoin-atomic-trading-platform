'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _btcWallet = require('./btc-wallet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mnemonic = require('bitcore-mnemonic');
// import {EthWallet} from "./eth-wallet";
//

var Wallet = exports.Wallet = function () {
  function Wallet() {
    _classCallCheck(this, Wallet);
  }

  _createClass(Wallet, null, [{
    key: 'Ethereum',
    get: function get() {
      // return {
      //   EthWallet,
      //   'login': (keystore, password) => {
      //     this.EthWallet = new EthWallet();
      //     this.EthWallet.login(keystore, password);
      //   },
      //   'create': (password) => {
      //       this.EthWallet = new EthWallet();
      //       this.EthWallet.create(password);
      //   },
      // }
    }
  }, {
    key: 'Bitcoin',
    get: function get() {
      return {
        BtcWallet: _btcWallet.BtcWallet
      };
    }
  }, {
    key: 'code',
    get: function get() {
      var code = new Mnemonic();
      return code;
    }
  }]);

  return Wallet;
}();