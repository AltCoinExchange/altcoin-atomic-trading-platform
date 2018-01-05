import {RedeemParams} from "../../atomic-swap/redeem-params";

export class BtcRedeemParams extends RedeemParams {
  constructor(public privKey, secret, hashedSecret,
              public contractBin, public contractTx) {
    super(secret, hashedSecret);
  }
}
