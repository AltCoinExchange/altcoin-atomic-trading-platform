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


    async initiate(refundTime, secret, address, amount) {

        let secretObj = null;

        if (secret === '') {
            secretObj = this.atomicSwap.common.GenerateSecret();
            secret = secretObj.hashedSecret;
        }

        const result = await this.atomicSwap.Initiate(refundTime, secret, address, amount);
        result.secret = secretObj;
        return result;
    }
}
