import {RefundData} from "../../atomic-swap";

export class BtcRefundData extends RefundData {
    constructor(public refundFee: any, public refundTx: any) {
        super();
    }
}
