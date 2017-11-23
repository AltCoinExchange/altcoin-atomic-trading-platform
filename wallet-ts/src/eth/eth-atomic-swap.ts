import {IAtomicSwap} from "../common/atomic-swap.interface";
import {ExtractSecretData} from "../common/extract-secret.data";
import {InitiateData} from "../common/initiate-data";
import {ParticipateData} from "../common/participate-data";
import {RedeemData} from "../common/redeem-data";
import {RefundData} from "../common/refund-data";
import {EthEngine} from "./eth-engine";
import {EthExtractSecretData} from "./eth-extract-secret-data";
import {EthInitiateData} from "./eth-initiate-data";
import {EthInitiateParams} from "./eth-initiate-params";
import {EthParticipateData} from "./eth-participate-data";
import {EthRedeemData} from "./eth-redeem-data";
import {EthRefundData} from "./eth-refund-data";

export class EthAtomicSwap implements IAtomicSwap {
  public engine: EthEngine;

  constructor(abiConfiguration, private appConfiguration, bin) {
    this.engine = new EthEngine(abiConfiguration, appConfiguration, bin);
  }

  public async initiate(initParams: EthInitiateParams): Promise<InitiateData> {
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
      const initiateData = new EthInitiateData();
      return initiateData;
    });
  }

  public async participate(refundTime, secret, address, amount, extendedParams): Promise<ParticipateData> {
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

  public async redeem(secret, hashedSecret, extendedParams): Promise<RedeemData> {

    const params = {
      from: this.appConfiguration.defaultWallet,
      ...extendedParams,
    };

    return await this.engine.callFunction("redeem", [secret, hashedSecret], params, 1).then((resp) => {
      // TODO map the fields to ethRedeemData
      return new EthRedeemData();
    });
  }

  public async extractSecret(hashedSecret, extendedParams): Promise<ExtractSecretData> {
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

  public async refund(hashedSecret, extendedParams): Promise<RefundData> {
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
