/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
const dcrcoin = require('node-dcr-rpc');

export class DcrWallet {

    // Decred wallet and RPC API
    //this.dcrd = null;

    constructor() {
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
    login(keystore, password) {


    }

    /**
     * Create account
     * @param accNaem
     * @returns {{address}}
     */
    create(accName, password) {
        const accountName = accName;
        this.dcrd.cmd('createnewaccount', accountName, function(err, wallets){
            if (err) return console.log(err);
            console.log('createenwaccount:', "true");
            this.dcrd.cmd('getnewaddress', accountName, function(err, address){
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
