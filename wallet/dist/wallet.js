'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _btcWallet = require('./btc-wallet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = exports.Wallet = function () {
  function Wallet() {
    _classCallCheck(this, Wallet);
  }

  _createClass(Wallet, null, [{
    key: 'Ethereum',
    value: function Ethereum() {
      return {
        'login': function login() {},
        'create': function create() {}
      };
    }
  }, {
    key: 'Bitcoin',
    get: function get() {
      return {
        BtcWallet: _btcWallet.BtcWallet
        // return new BtcWallet(code);
      };
    }
  }]);

  return Wallet;
}();

// const btcWallet = new Wallet.Bitcoin.BtcWallet('select scout crash enforce riot rival spring whale hollow radar rule sentence');
// console.log(btcWallet);


var btc = new Wallet.Bitcoin.BtcWallet('select scout crash enforce riot rival spring whale hollow radar rule sentence');
console.log(btc);
// console.log(new btc.Wallet('select scout crash enforce riot rival spring whale hollow radar rule sentence'));
// const btcWallet = Wallet
//   .Bitcoin('select scout crash enforce riot rival spring whale hollow radar rule sentence');
//
//
// btcWallet.generateHDPrivateKey('sifra');
//
// const hdPrivateKey = btcWallet.deriveHdPrivateKey(1);
//
// const hdPublicKey = hdPrivateKey.hdPublicKey;
//
// console.log(btcWallet.generateAddress(hdPublicKey));