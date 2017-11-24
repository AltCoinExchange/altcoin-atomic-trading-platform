import {RedeemParams} from "../../atomic-swap/redeem-params";

export class BtcRedeemParams extends RedeemParams {
  public secret;
  public hashedSecret;
  public extendedParams;
  public contractBin;
  public contractTx;

}
