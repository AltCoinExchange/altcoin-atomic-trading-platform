import {RedeemParams} from "../../atomic-swap/redeem-params";

export class EthRedeemParams extends RedeemParams {
  constructor(secret, hashedSecret, public extendedParams) {
    super(secret, hashedSecret);
  }
}
