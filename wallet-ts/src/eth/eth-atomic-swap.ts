import {IAtomicSwap} from "../atomic-swap/atomic-swap.interface";
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
    const refundTime = initParams.refundTime;
    const secret = initParams.secret;
    const address = initParams.address;
    const amount = initParams.amount;
    const extendedParams = initParams.extendedParams;
    const conversion = (extendedParams && extendedParams.conversion) ? extendedParams.conversion : "ether";

    const params = {
      ...extendedParams,
      from: this.appConfiguration.defaultWallet,
      value: this.engine.toWei(amount, conversion),
      conversion: undefined,
    };

    return await this.engine.callFunction("initiate", [refundTime, secret, address], params).then((resp) => {
      // TODO map the fields to ethInitiateData
      const initiateData = new EthInitiateData(null, secret);
      return initiateData;
    });
  }

  public async participate(partParams: EthParticipateParams): Promise<EthParticipateData> {
    const refundTime = partParams.refundTime;
    const secret = partParams.secret;
    const address = partParams.address;
    const amount = partParams.amount;
    const extendedParams = partParams.extendedParams;

    const conversion = (extendedParams && extendedParams.conversion) ? extendedParams.conversion : "ether";

    const params = {
      from: this.appConfiguration.defaultWallet,
      value: this.engine.toWei(amount, conversion),
      ...extendedParams,
      conversion: undefined,
    };
    return await this.engine.callFunction("participate", [refundTime, secret, address], params).then((resp) => {
      // TODO map the fields to ethParticipateData
      return new EthParticipateData();
    });
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
