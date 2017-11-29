import {RefundParams} from "../../atomic-swap/refund-params";

export class EthRefundParams extends RefundParams {
  public hashedSecret;
  public extendedParams;
}
