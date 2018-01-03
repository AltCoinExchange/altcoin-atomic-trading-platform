import {IAtomicSwap} from "../atomic-swap/atomic-swap.interface";
import {SecretGenerator, SecretResult} from "../common/hashing";
import {EthExtractSecretData} from "./atomic-swap/eth-extract-secret-data";
import {EthExtractSecretParams} from "./atomic-swap/eth-extract-secret-params";
import {EthInitiateData} from "./atomic-swap/eth-initiate-data";
import {EthInitiateParams} from "./atomic-swap/eth-initiate-params";
import {EthParticipateData} from "./atomic-swap/eth-participate-data";
import {EthParticipateParams} from "./atomic-swap/eth-participate-params";
import {EthRedeemData} from "./atomic-swap/eth-redeem-data";
import {EthRedeemParams} from "./atomic-swap/eth-redeem-params";
import {EthRefundData} from "./atomic-swap/eth-refund-data";
import {EthRefundParams} from "./atomic-swap/eth-refund-params";
import {EthConfirmation, EthEngine} from "./eth-engine";

import {AtomicSwapAbi} from "../config/abi/atomicswap";
import {AtomicSwapBin} from "../config/abi/bin";
import * as AppConfig from "../config/config-eth";

export class EthAtomicSwap implements IAtomicSwap {
    public engine: EthEngine;
    private abiConfiguration;
    private appConfiguration;
    private bin;

    constructor(net: string) {
        if (net === "testnet") {
            this.abiConfiguration = AtomicSwapAbi;
            this.appConfiguration = AppConfig.EthConfiguration.hosts[0];
            this.bin = AtomicSwapBin;
        } else if (net === "mainnet") {
            // TODO config for mainnet
        }
        this.engine = new EthEngine(this.abiConfiguration, this.appConfiguration, this.bin);
    }

    public async initiate(initParams: EthInitiateParams): Promise<EthInitiateData> {
        const secret: SecretResult = SecretGenerator.generateSecret();
        const refundTime = initParams.refundTime;
        const secretHash = secret.secretHash.indexOf("0x") === -1 ? "0x" + secret.secretHash : secret.secretHash;
        const address = initParams.address;
        const params = {
            from: this.appConfiguration.defaultWallet,
            value: this.engine.toWei(initParams.amount, "ether"),
        };
        return await this.engine.callFunction("initiate", [refundTime, secretHash, address], params)
            .then((resp: any) => {
                const initiateData = new EthInitiateData(
                    secret.secret,
                    secret.secretHash, resp.blockHash, resp.blockNumber, resp.contractAddress,
                    resp.cumulativeGasUsed, resp.from, resp.gasUsed, resp.logsBloom, resp.status,
                    resp.to, resp.transactionHash, resp.transactionIndex);
                return initiateData;
            });
    }

    public async participate(partParams: EthParticipateParams): Promise<EthParticipateData> {
        const refundTime = partParams.refundTime;
        const secretHash = partParams.secretHash;
        const address = partParams.address;

        const params = {
            from: this.appConfiguration.defaultWallet,
            value: this.engine.toWei(partParams.amount, "ether"),
        };

        // tslint:disable-next-line
        console.log("ETH PARTICIPATE PARAMS: ", partParams);

        const resp: any = await this.engine.callFunction("participate", [refundTime, secretHash, address], params);

        // tslint:disable-next-line
        console.log("ETH PARTICIPATE RESPONSE: ", resp);

        return new EthParticipateData(resp.blockHash, resp.blockNumber, resp.contractAddress,
            resp.cumulativeGasUsed, resp.from, resp.gasUsed, resp.logsBloom, resp.status,
            resp.to, resp.transactionHash, resp.transactionIndex);
    }

    public async redeem(redeemParams: EthRedeemParams): Promise<EthRedeemData> {
        const secret = redeemParams.secret;
        const hashedSecret = redeemParams.hashedSecret;
        const extendedParams = redeemParams.extendedParams;

        const params = {
            from: this.appConfiguration.defaultWallet,
        };

        // tslint:disable-next-line
        console.log("ETH REDEEM PARAMS: ", redeemParams, this);

        const resp: any = await this.engine.callFunction("redeem", [secret, hashedSecret], params);

        // tslint:disable-next-line
        console.log("ETH REDEEM RESPONSE: ", resp);

        return new EthRedeemData(secret, hashedSecret);
    }

    public async extractSecret(extractSecretParams: EthExtractSecretParams): Promise<EthExtractSecretData> {
        const hashedSecret = extractSecretParams.hashedSecret;
        const extendedParams = extractSecretParams.extendedParams;

        const params = {
            from: this.appConfiguration.defaultWallet,
            ...extendedParams,
        };

        return await this.engine.callFunction("swaps", [hashedSecret], params, EthConfirmation.STATIC).then((resp) => {
            // TODO map the fields to ethExtractSecretData
            const secretData = new EthExtractSecretData();
            return secretData;
        });
    }

    public async refund(refundParams: EthRefundParams): Promise<EthRefundData> {
        const hashedSecret = refundParams.hashedSecret;
        const extendedParams = refundParams.extendedParams;

        const params = {
            from: this.appConfiguration.defaultWallet,
            ...extendedParams,
        };

        return this.engine.callFunction("refund", [hashedSecret], params).then((resp) => {
            // TODO map the fields to ethRefundData
            return new EthRefundData();
        });
    }

}
