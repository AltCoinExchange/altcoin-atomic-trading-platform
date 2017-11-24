import {BtcRefundData} from "./btc-refund-data";

export class BtcAtomicSwapContractData extends BtcRefundData {
    public contract: any;
    public contractP2SH: any;
    public contractP2SHPkScript: any;
    public contractTxHash: any;
    public contractTx: any;
    public contractFee: any;
    constructor(contract: any, contractP2SH: any, contractP2SHPkScript: any, contractTxHash: any,
                contractTx: any, contractFee: any, refundFee: any, refundTx: any) {
        super(refundFee, refundTx);
        this.contract = contract;
        this.contractP2SH = contractP2SH;
        this.contractP2SHPkScript = contractP2SHPkScript;
        this.contractTxHash = contractTxHash;
        this.contractTx = contractTx;
        this.contractFee = contractFee;
    }
}
