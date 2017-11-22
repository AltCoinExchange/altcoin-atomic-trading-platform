
/**
 * Ethereum wallet TS
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

import * as AppConfig from './config/config-eth';

export class EthWallet {
    AppConfig: any;
    AtomicSwap: any;
    AbiConfig: any;
    BinConfig: any;
    atomicSwap: any;

    constructor() {
        this.AtomicSwap = require('ethatomicswap/modules/atomicswap');
        this.AbiConfig = require('./config/abi/atomicswap.json');
        this.BinConfig = require('./config/abi/bin.json');
        this.atomicSwap = new this.AtomicSwap(this.AbiConfig, AppConfig.EthConfiguration.hosts[0], this.BinConfig);
    }

    /**
     * Login
     * @param keystore
     * @param password
     */
    login(keystore, password) {
        return this.atomicSwap.engine.Login(keystore, password);
    }

    /**
     * Create account
     * @param password
     * @returns {{wallet, keystore}}
     */
    create(password) {
        return this.atomicSwap.engine.CreateAccount(password);
    }

    /**
     * Recover account with password
     * @param password
     * @param privateKey
     * @returns {{wallet, keystore}}
     */
    recover(privateKey, password) {
        return this.atomicSwap.engine.RecoverAccount(privateKey, password);
    }

    /**
     * Get wallet balance
     * @param address
     * @returns {*}
     */
    getbalance(address) {
        return this.atomicSwap.engine.GetBalance(address);
    }

    /**
    * Send All Ether
    * @param privateKey
    * @param toAddress
    * @returns {Promise<number>}
    */
    async sendAllEther(privateKey, toAddress) {
        return this.atomicSwap.engine.sendAllEther(privateKey, toAddress);
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

        let secretObj = null;

        if (secret === '') {
            secretObj = this.atomicSwap.common.GenerateSecret();
            secret = '0x' + secretObj.hashedSecret;
        }

        const result = await this.atomicSwap.Initiate(refundTime, secret, address, amount);
        result.secret = secretObj;
        return result;
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
        const result = await this.atomicSwap.Participate(refundTime, secret, address, amount);
        return result;
    }

    /**
     * Extract swap info
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async extractsecret(hashedSecret) {
        const result = await this.atomicSwap.ExtractSecret(hashedSecret);
        return result;
    }

    /**
     * Redeem atomic swap
     * @param secret
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async redeem(secret, hashedSecret) {
        const result = await this.atomicSwap.Redeem(secret, hashedSecret);
        return result;
    }

    /**
     * Refund atomic swap
     * @param hashedSecret
     * @returns {Promise.<*>}
     */
    async refund(hashedSecret) {
        const result = await this.atomicSwap.Refund(hashedSecret);
        return result;
    }
}
