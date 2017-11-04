'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mnemonic = require('bitcore-mnemonic');

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
    value: function Bitcoin() {}
  }]);

  return Wallet;
}();