import {InitiateParams} from "../../atomic-swap";

export class BtcInitiateParams extends InitiateParams {
  constructor(public refundTime, public privKey, public address, public amount, public extendedParams?) {
    super();
  }
}
