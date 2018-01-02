import {InitiateParams} from "../../atomic-swap";

export class BtcInitiateParams extends InitiateParams {
  constructor(public refundTime, public privKey, public address, public amount, public extendedParams?) {
    super();
  }
}

import {ExtractSecretParams} from "../../atomic-swap";

export class BtcExtractSecretParams extends ExtractSecretParams {
  public hashedSecret;
  public redemptionTx;
  public extendedParams;
}

import {ParticipateParams} from "../../atomic-swap/participate-params";

export class BtcParticipateParams extends ParticipateParams {
  public refundTime;
  public secretHash;
  public privateKey;
  public address;
  public amount;
  public extendedParams;
}

import {RedeemParams} from "../../atomic-swap/redeem-params";

export class BtcRedeemParams extends RedeemParams {
  public secret;
  public hashedSecret;
  public extendedParams;
  public contractBin;
  public contractTx;

}

import {RefundParams} from "../../atomic-swap/refund-params";

export class BtcRefundParams extends RefundParams {
  public hashedSecret;
  public extendedParams;
}
