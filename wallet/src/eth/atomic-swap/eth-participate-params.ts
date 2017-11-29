import {ParticipateParams} from "../../atomic-swap";

export class EthParticipateParams extends ParticipateParams {
    constructor(public refundTime, public secretHash, public address, public amount, public privateKey) {
        super();
    }
}
