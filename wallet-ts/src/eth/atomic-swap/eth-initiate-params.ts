import {InitiateParams} from "../../atomic-swap/initiate-params";

export class EthInitiateParams extends InitiateParams {
  constructor(public refundTime, public address, public amount) {
    super();
  }
}
