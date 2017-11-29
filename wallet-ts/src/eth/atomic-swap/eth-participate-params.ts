import {ParticipateParams} from "../../atomic-swap/participate-params";

export class EthParticipateParams extends ParticipateParams {
  public refundTime;
  public secretHash;
  public address;
  public amount;
  public extendedParams;
}
