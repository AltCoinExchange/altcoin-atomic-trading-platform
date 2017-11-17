"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tls = require("tls");
tls.DEFAULT_ECDH_CURVE = "secp521r1";

/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var DcrWallet = exports.DcrWallet = function () {
  function DcrWallet() {
    _classCallCheck(this, DcrWallet);

    this.AppConfig = require("../dcrConfig.json");

    var dcrcoin = require('node-dcr-rpc');

    this.dcrd = new dcrcoin.Client({
      host: this.AppConfig.host,
      dcrdPort: this.AppConfig.port, // dcrd port
      dcrWalletPort: this.AppConfig.walletPort, // dcrwallet port
      //port: this.AppConfig.port,
      user: this.AppConfig.user,
      pass: this.AppConfig.pass,
      ssl: this.AppConfig.ssl,
      sslCa: this.AppConfig.sslCa
    });

    // TODO: gRPC throwing error compilation main focus is on normal RPC
    // var fs = require('fs');
    // var grpc = require('grpc');
    // var protoDescriptor = grpc.load('wallet/api.proto');
    // var walletrpc = protoDescriptor.walletrpc;
    //
    // var cert = fs.readFileSync("wallet/certs/decred_wallet.cert");
    // var creds = grpc.credentials.createSsl(cert); //Buffer.from(this.AppConfig.sslCa)
    // var client = new walletrpc.WalletService(this.AppConfig.host + ":" + this.AppConfig.port, creds);
    //
    // var request = {
    //
    // };
    //
    // client.accounts(request, function(err, response) {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log('Spendable balance:', response.spendable, 'atoms');
    //     }
    // });
  }

  /**
   * Login
   * @param keystore
   * @param password
   */


  _createClass(DcrWallet, [{
    key: "login",
    value: function login(account, password) {
      this.dcrd.cmd('authenticate', [account, password], function (err, wallets) {
        if (err) {
          return console.log(err);
        }
        console.log(wallets);
      });
    }
  }, {
    key: "create",


    /**
     * Create account
     * @param accName
     * @returns {{address}}
     */
    value: function create(accName, password) {
      // const accountName = accName;
      // this.dcrd.cmd('createnewaccount', accountName, function(err, wallets){
      //     if (err) {
      //         return console.log(err);
      //     }
      //
      //     console.log('createenwaccount:', "true");
      //     this.dcrd.cmd('getnewaddress', accountName, function(err, address){
      //         if (err) return console.log(err);
      //         console.log('getnewaddress:', address);
      //         return address;
      //     });
      // });
    }
  }, {
    key: "test",
    value: function test() {
      this.dcrd.getinfo(function (err, info) {
        if (err) return console.log(err);
        console.log('info:', info);
      });

      this.dcrd.wallet.listaccounts(function (err, accounts) {
        if (err) return console.log(err);
        console.log('listaccounts:', accounts);
      });
    }

    /**
     * Recover account with password
     * @param password
     * @param privateKey
     * @returns {{wallet, keystore}}
     */

  }, {
    key: "recover",
    value: function recover(privateKey, password) {}

    /**
     * Get wallet balance
     * @param address
     * @returns {*}
     */

  }, {
    key: "getbalance",
    value: function getbalance(address) {}

    /**
     * Send All Ether
     * @param privateKey
     * @param toAddress
     * @returns {Promise<number>}
     */

  }, {
    key: "sendAllEther",
    value: function sendAllEther(privateKey, toAddress) {
      return Promise.resolve();
    }

    /**
     * Initiate atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */

  }, {
    key: "initiate",
    value: function initiate(refundTime, secret, address, amount) {
      return Promise.resolve();
    }

    /**
     * Participate in atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */

  }, {
    key: "participate",
    value: function participate(refundTime, secret, address, amount) {
      return Promise.resolve();
    }

    /**
     * Extract swap info
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: "extractsecret",
    value: function extractsecret(hashedSecret) {
      return Promise.resolve();
    }

    /**
     * Redeem atomic swap
     * @param secret
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: "redeem",
    value: function redeem(secret, hashedSecret) {
      return Promise.resolve();
    }

    /**
     * Refund atomic swap
     * @param hashedSecret
     * @returns {Promise.<*>}
     */

  }, {
    key: "refund",
    value: function refund(hashedSecret) {
      return Promise.resolve();
    }
  }]);

  return DcrWallet;
}();