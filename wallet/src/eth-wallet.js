/**
 * Ethereum wallet es6
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

export class EthWallet {

    //atomicSwap;

    constructor() {
        this.AppConfig = require("ethatomicswap/config.json");
        this.AtomicSwap = require("ethatomicswap/modules/atomicswap");
        this.AbiConfig = require("ethatomicswap/abi/atomicswap.json");
        this.BinConfig = require("ethatomicswap/abi/bin.json");
        this.atomicSwap = new this.AtomicSwap(this.AbiConfig, this.AppConfig.hosts[0], this.BinConfig);
    }

    /**
     * Login
     * @param keystore
     * @param password
     */
    login(keystore, password) {

        if (keystore === null)
            this.keystore = require("ethatomicswap/testAccount.json").keystore;

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
