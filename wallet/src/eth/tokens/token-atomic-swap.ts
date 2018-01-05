import {SecretGenerator, SecretResult} from "../../common/hashing";
import {TokenAtomicSwapAbi} from "../../config/abi/tokenatomicswap";
import {AbiUtil} from "../../config/abi/util/abiutil";
import {TokenConfig} from "../../config/tokens/tokenconfig";
import {EthInitiateData} from "../atomic-swap";
import {EthExtractSecretData} from "../atomic-swap/eth-extract-secret-data";
import {EthInitiateParams} from "../atomic-swap/eth-initiate-params";
import {EthParticipateData} from "../atomic-swap/eth-participate-data";
import {EthParticipateParams} from "../atomic-swap/eth-participate-params";
import {EthRedeemData} from "../atomic-swap/eth-redeem-data";
import {EthRedeemParams} from "../atomic-swap/eth-redeem-params";
import {EthConfirmation} from "../eth-engine";
import {ERC20} from "./ERC20";
import abiParams = AbiUtil.abiParams;
import AbiType = AbiUtil.AbiType;
import getAbiParams = AbiUtil.getAbiParams;

export class TokenAtomicSwap extends ERC20 {

    @abiParams({stateMutability: "payable"}, {}, {"_hashedSecret": AbiType.bytes20}, {"_initiator": AbiType.address},
        {"_token": AbiType.address}, {"_amount": AbiType.uint256})
    public async participate(partParams: EthParticipateParams): Promise<EthParticipateData> {
        const abi = getAbiParams(this, "participate");

        const generalParams = {
            from: this.ethEngine.configuration.defaultWallet
        };

        // tslint:disable-next-line
        console.log("ETH TOKEN PARTICIPATE PARAMS: ", partParams);

        const amount = parseFloat(partParams.amount);
        const approveResult = await this.approve(TokenConfig.AtomicSwap.contractAddress, amount);
// const transferResult = this.transfer(TokenConfig.AtomicSwap.contractAddress,
// this.ethEngine.toWei(partParams.amount, "ether"));

        const resp: any = await this.ethEngine.callFunction("participate",
            [partParams.secretHash, partParams.address, this.contractAddress, amount],
            generalParams, EthConfirmation.RECEIPT,
            abi, TokenConfig.AtomicSwap.contractAddress);

        // tslint:disable-next-line
        console.log("ETH TOKEN PARTICIPATE RESPONSE: ", resp);

        return new EthParticipateData(resp.blockHash, resp.blockNumber, resp.contractAddress,
            resp.cumulativeGasUsed, resp.from, resp.gasUsed, resp.logsBloom, resp.status,
            resp.to, resp.transactionHash, resp.transactionIndex);
    }

    @abiParams({stateMutability: "payable"}, {}, {"_hashedSecret": AbiType.bytes20}, {"_participant": AbiType.address},
        {"_token": AbiType.address}, {"_amount": AbiType.uint256})
    public async initiate(initParams: EthInitiateParams): Promise<EthInitiateData> {
        const abi = getAbiParams(this, "initiate");

        const secret: SecretResult = SecretGenerator.generateSecret();
        const secretHash = secret.secretHash.indexOf("0x") === -1 ? "0x" + secret.secretHash : secret.secretHash;

        const generalParams = {
            from: this.ethEngine.configuration.defaultWallet
        };

        // tslint:disable-next-line
        console.log("ETH TOKEN INITIATE PARAMS: ", initParams);

        const amount = parseFloat(initParams.amount);
        const approveResult = await this.approve(TokenConfig.AtomicSwap.contractAddress, amount);
// const transferResult = this.transfer(TokenConfig.AtomicSwap.contractAddress,
// this.ethEngine.toWei(initParams.amount, "ether"));

        const result: any = await this.ethEngine.callFunction("initiate",
            [secretHash, initParams.address, this.contractAddress, amount], generalParams,
            EthConfirmation.RECEIPT, abi, TokenConfig.AtomicSwap.contractAddress).then((resp: any) => {
            // tslint:disable-next-line
            console.log("ETH TOKEN INITIATE RESPONSE: ", resp);
            const initiateData = new EthInitiateData(
                secret.secret,
                secret.secretHash, resp.blockHash, resp.blockNumber, resp.contractAddress,
                resp.cumulativeGasUsed, resp.from, resp.gasUsed, resp.logsBloom, resp.status,
                resp.to, resp.transactionHash, resp.transactionIndex);
            return initiateData;
        });

        return result;
    }

    @abiParams({}, {}, {"_hashedSecret": AbiType.bytes20})
    public async refund(hashedSecret: string): Promise<any> {
        const abi = getAbiParams(this, "refund");

        const generalParams = {
            from: this.ethEngine.configuration.defaultWallet
        };

        const result: any = await this.ethEngine.callFunction("refund", [hashedSecret],
            generalParams, EthConfirmation.RECEIPT, abi, TokenConfig.AtomicSwap.contractAddress);
        return result;
    }

    @abiParams({stateMutability: "payable"}, {}, {"_secret": AbiType.bytes32}, {"_hashedSecret": AbiType.bytes20})
    public async redeem(redeemParams: EthRedeemParams): Promise<EthRedeemData> {
        const abi = getAbiParams(this, "redeem");

        const generalParams = {
            from: this.ethEngine.configuration.defaultWallet
        };

        // tslint:disable-next-line
        console.log("ETH TOKEN REDEEM PARAMS: ", redeemParams);

        const result: any = await this.ethEngine.callFunction("redeem",
            [redeemParams.secret, redeemParams.hashedSecret],
            generalParams, EthConfirmation.RECEIPT, abi, TokenConfig.AtomicSwap.contractAddress);

        // tslint:disable-next-line
        console.log("ETH TOKEN REDEEM RESPONSE: ", result);

        return new EthRedeemData(redeemParams.secret, redeemParams.hashedSecret);
    }

    public async extractSecret(hashedSecret: string): Promise<any> {
        const params = {
            from: this.ethEngine.configuration.defaultWallet
        };

        return await this.ethEngine.callFunction("swaps", [hashedSecret], params,
            EthConfirmation.STATIC, TokenAtomicSwapAbi, TokenConfig.AtomicSwap.contractAddress).then((resp) => {
            // TODO map the fields to ethExtractSecretData
            const secretData = new EthExtractSecretData();
            return secretData;
        });
    }
}
