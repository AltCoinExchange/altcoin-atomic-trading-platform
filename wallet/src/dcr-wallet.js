const tls = require("tls");
tls.DEFAULT_ECDH_CURVE = "secp521r1";

import {buildContract} from '../../btcatomicswap/src/contract/build-contract';
import {generateSecret} from '../../btcatomicswap/src/common/secret-hash';
import {getUnixTimeFor2Days} from '../../btcatomicswap/src/common/unix-ts';
import {configuration} from '../../btcatomicswap/src/config/config';

const Mnemonic = require('bitcore-mnemonic');
var bitcore = require('bitcore');
var HDPrivateKey = bitcore.HDPrivateKey;
var PrivateKey = bitcore.PrivateKey;

/**
 * Decred wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

export class DcrWallet {

    constructor(code, regenerate = false) {
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

        if (regenerate === true) {
            this.hdPrivateKey = new HDPrivateKey(code);
        } else {
            const valid = Mnemonic.isValid(code);
            if (!valid) {
                throw Error('Not valid mnemonic code');
            }
            this.code = new Mnemonic(code);
        }
        this.derived = {};
        this.addressess = {};
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

    test() {
        this.dcrd.wallet.listscripts(function(err, info) {
            if (err) return console.log(err);
            console.log('scripts:', info);
        });
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
    async initiate(them, amount, privateKey) {
        const {secret, secretHash} = generateSecret();
        const lockTime = getUnixTimeFor2Days();

        const b = await buildContract(them, amount, lockTime, secretHash, privateKey);

        this.dcrd.sendrawtransaction(b.contractTx.toString(), function(err, info) {
            if (err) return console.log(err);
            console.log('info:', info);

            return {
                secret,
                secretHash,
                fee: b.contractFee,
                contract: b.contractP2SH.toString(),
                contractHex: b.contract.toHex(),
                contractTx: b.contractTx.hash,
                contractTxHex: b.contractTx.toString(),
                rawTx,
            };
        });
    }

    generateHDPrivateKey(passPhrase) {
        this.hdPrivateKey = this.code.toHDPrivateKey(passPhrase, btcRpcConfiguration.network);
        return this.hdPrivateKey;
    }

    deriveHdPrivateKey(deriveArg) {
        if (!this.hdPrivateKey) {
            throw new Error('No HdPrivateKey found to derive from, did you mean to use generateHDPrivateKey() ?');
        }
        const derived = this.hdPrivateKey.derive(deriveArg);
        this.derived[deriveArg] = derived;
        return derived;
    }

    generateAddress(hdPublicKey) {
        if (!hdPublicKey) {
            throw new Error('hdPublicKey required to generate address');
        }
        const address = hdPublicKey.publicKey.toAddress();
        this.addressess[hdPublicKey] = address;
        return address;
    }

    generateAddressFromWif(wif) {
        const WIF = new PrivateKey(wif);
        return WIF.toPublicKey().toAddress(configuration.network);
    }

    getDerived() {
        return this.derived;
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
