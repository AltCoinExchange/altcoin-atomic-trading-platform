const tls = require("tls");
tls.DEFAULT_ECDH_CURVE = "secp521r1";

/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

export class DcrWallet {

    constructor() {
        this.AppConfig = require("../dcrConfig.json");

        const dcrcoin = require('node-dcr-rpc');

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
    login(account, password) {
        this.dcrd.wallet.authenticate(account, password, function(err, wallets) {
            if (err) {
                return console.log(err);
            }
            console.log(wallets);
        });
    }

    /**
     * Create account
     * @param accName
     * @returns {{address}}
     */
    create(accName, password) {
        this.dcrd.wallet.createnewaccount(accName, password, function(err, wallets) {
            if (err) {
                return console.log(err);
            }
            console.log(wallets);
        });
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

    getInfo() {
        this.dcrd.getinfo(function(err, info) {
            if (err) return console.log(err);
            console.log('info:', info);
        });
    }

    listAccounts() {
        this.dcrd.wallet.listaccounts(function (err, accounts) {
            if (err) return console.log(err);
            console.log('listaccounts:', accounts);
        });
    }

    getBalance() {
        this.dcrd.wallet.getbalance(function (err, balance) {
            if (err) return console.log(err);
            console.log('getbalance:', balance);
        });
    }

    /**
     * Recover account with password
     * @param password
     * @param privateKey
     * @returns {{wallet, keystore}}
     */
    recover(privateKey, password) {

    }

    /**
     * Get wallet balance
     * @param address
     * @returns {*}
     */
    getbalance(address) {

    }

    /**
     * Send All Ether
     * @param privateKey
     * @param toAddress
     * @returns {Promise<number>}
     */
    async sendAllEther(privateKey, toAddress) {

    }

    /**
     * Initiate atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */
    async initiate(refundTime, secret, address, amount) {

    }

    /**
     * Participate in atomic swap
     * @param refundTime
     * @param secret
     * @param address
     * @param amount
     * @returns {Promise.<*>}
     */
    async participate(refundTime, secret, address, amount) {

    }

    /**
     * Extract swap info
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async extractsecret(hashedSecret) {

    }

    /**
     * Redeem atomic swap
     * @param secret
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async redeem(secret, hashedSecret) {

    }

    /**
     * Refund atomic swap
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async refund(hashedSecret) {

    }
}
