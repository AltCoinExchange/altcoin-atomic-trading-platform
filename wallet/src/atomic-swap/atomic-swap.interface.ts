import {ExtractSecretData} from "./extract-secret.data";
import {ExtractSecretParams} from "./extract-secret.params";
import {InitiateData} from "./initiate-data";
import {InitiateParams} from "./initiate-params";
import {ParticipateData} from "./participate-data";
import {ParticipateParams} from "./participate-params";
import {RedeemData} from "./redeem-data";
import {RedeemParams} from "./redeem-params";
import {RefundData} from "./refund-data";
import {RefundParams} from "./refund-params";

export interface IAtomicSwap {
  initiate(params: InitiateParams): Promise<InitiateData>;

  participate(params: ParticipateParams): Promise<ParticipateData>;

  redeem(params: RedeemParams): Promise<RedeemData>;

  extractSecret(extractSecretParams: ExtractSecretParams): Promise<ExtractSecretData>;

  refund(refundParams: RefundParams): Promise<RefundData>;
}
