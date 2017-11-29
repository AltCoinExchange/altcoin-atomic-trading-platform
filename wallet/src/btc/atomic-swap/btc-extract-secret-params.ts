import {ExtractSecretParams} from "../../atomic-swap";

export class BtcExtractSecretParams extends ExtractSecretParams {
  public hashedSecret;
  public redemptionTx;
  public extendedParams;
}
