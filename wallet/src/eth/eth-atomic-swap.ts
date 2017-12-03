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
import {EthEngine} from "./eth-engine";

export class EthAtomicSwap implements IAtomicSwap {
  public engine: EthEngine;

  constructor(abiConfiguration, private appConfiguration, bin) {
    this.engine = new EthEngine(abiConfiguration, appConfiguration, bin);
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
    return await this.engine.callFunction("initiate", [refundTime, secretHash, address], params).then((resp: any) => {
      const initiateData = new EthInitiateData(
        secret.secret,
        secret.secretHash, resp.blockHash, resp.blockNumber, resp.contractAddress,
        resp.cumulativeGasUsed, resp.from, resp.gasUsed, resp.logsBloom, resp.status,
        resp.to, resp.transactionHash, resp.transactionIndex);
      return initiateData;
    });
  }

  public async participate(partParams: EthParticipateParams): Promise<EthParticipateData> {

    // tslint:disable-next-line
    console.log("ne treba", partParams);
    const keystore = this.engine.recoverAccount(partParams.privateKey);
    const loggedIn = this.engine.login(keystore, partParams.privateKey);
    // tslint:disable-next-line
    console.log(loggedIn);

    const refundTime = partParams.refundTime;
    const secretHash = partParams.secretHash;
    const address = partParams.address;
    const amount = partParams.amount;

    const params = {
      from: this.appConfiguration.defaultWallet,
      value: this.engine.toWei(amount, "ether"),
    };

    const participateResult = this.engine
      .callFunction("participate", [refundTime, secretHash, address], params).then((resp) => {
        // TODO map the fields to ethParticipateData
        // tslint:disable-next-line
        console.log(resp);
        return new EthParticipateData();
      });

    return participateResult.then((value) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(value), 5000),
      ),
    );
  }

  public async redeem(redeemParams: EthRedeemParams): Promise<EthRedeemData> {
    const secret = redeemParams.secret;
    const hashedSecret = redeemParams.hashedSecret;
    const extendedParams = redeemParams.extendedParams;

    const params = {
      from: this.appConfiguration.defaultWallet,
      ...extendedParams,
    };

    return await this.engine.callFunction("redeem", [secret, hashedSecret], params, 1).then((resp) => {
      // TODO map the fields to ethRedeemData
      return new EthRedeemData();
    });
  }

  public async extractSecret(extractSecretParams: EthExtractSecretParams): Promise<EthExtractSecretData> {
    const hashedSecret = extractSecretParams.hashedSecret;
    const extendedParams = extractSecretParams.extendedParams;

    const params = {
      from: this.appConfiguration.defaultWallet,
      ...extendedParams,
    };

    return await this.engine.callFunction("swaps", [hashedSecret], params, 2).then((resp) => {
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
