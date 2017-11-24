import {RefundData} from "../../atomic-swap";

export class BtcRefundData extends RefundData {
    refundFee: any;
    refundTx: any;
    constructor(refundFee: any, refundTx: any) {
        super();
        this.refundFee = refundFee;
        this.refundTx = refundTx;
    }
}
