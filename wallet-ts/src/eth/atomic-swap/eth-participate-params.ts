import {ParticipateParams} from "../../atomic-swap/participate-params";

export class EthParticipateParams extends ParticipateParams {
  public refundTime;
  public secret;
  public address;
  public amount;
  public extendedParams;
}
