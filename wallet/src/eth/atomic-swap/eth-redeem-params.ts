import {RedeemParams} from "../../atomic-swap/redeem-params";

export class EthRedeemParams extends RedeemParams {
  public secret;
  public hashedSecret;
  public extendedParams;
}
