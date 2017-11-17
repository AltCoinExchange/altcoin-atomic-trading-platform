'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
var dcrcoin = require('node-dcr-rpc');

var DcrWallet = exports.DcrWallet = function () {

  // Decred wallet and RPC API
  //this.dcrd = null;

  function DcrWallet() {
    _classCallCheck(this, DcrWallet);

    this.AppConfig = require("../dcrConfig.json");

    this.dcrd = new dcrcoin.Client({
      host: this.AppConfig.host,
      dcrdPort: this.AppConfig.port, // dcrd port
      dcrWalletPort: this.AppConfig.walletPort, // dcrwallet port
      port: this.AppConfig.port,
      user: this.AppConfig.user,
      pass: this.AppConfig.pass,
      ssl: this.AppConfig.ssl,
      sslCa: this.AppConfig.sslCa
    });
  }

  /**
   * Login
   * @param keystore
   * @param password
   */


  _createClass(DcrWallet, [{
    key: 'login',
    value: function login(keystore, password) {}

    /**
     * Create account
     * @param accNaem
     * @returns {{address}}
     */

  }, {
    key: 'create',
    value: function create(accName, password) {
      var accountName = accName;
      this.dcrd.cmd('createnewaccount', accountName, function (err, wallets) {
        if (err) return console.log(err);
        console.log('createenwaccount:', "true");
        this.dcrd.cmd('getnewaddress', accountName, function (err, address) {
          if (err) return console.log(err);
          console.log('getnewaddress:', address);
          return address;
        });
      });
    }

    /**
     * Recover account with password
     * @param password
     * @param privateKey
     * @returns {{wallet, keystore}}
     */

  }, {
    key: 'recover',
    value: function recover(privateKey, password) {}

    /**
     * Get wallet balance
     * @param address
     * @returns {*}
     */

  }, {
    key: 'getbalance',
    value: function getbalance(address) {}

    /**
     * Send All Ether
     * @param privateKey
     * @param toAddress
     * @returns {Promise<number>}
     */

  }, {
    key: 'sendAllEther',
    value: async function sendAllEther(privateKey, toAddress) {}

    /**
     * Initiate atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */

  }, {
    key: 'initiate',
    value: async function initiate(refundTime, secret, address, amount) {}

    /**
     * Participate in atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */

  }, {
    key: 'participate',
    value: async function participate(refundTime, secret, address, amount) {}

    /**
     * Extract swap info
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: 'extractsecret',
    value: async function extractsecret(hashedSecret) {}

    /**
     * Redeem atomic swap
     * @param secret
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: 'redeem',
    value: async function redeem(secret, hashedSecret) {}

    /**
     * Refund atomic swap
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: 'refund',
    value: async function refund(hashedSecret) {}
  }]);

  return DcrWallet;
}();