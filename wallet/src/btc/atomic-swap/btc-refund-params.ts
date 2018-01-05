import {RefundParams} from "../../atomic-swap/refund-params";

export class BtcRefundParams extends RefundParams {
  public hashedSecret;
  public extendedParams;
}
