import {InitiateData} from "../../atomic-swap";

export class BtcInitiateData extends InitiateData {
    public fee: any;
    public contract: string;
    public contractHex: any;
    public contractTx: any;
    public contractTxHex: string;
    public rawTx: any;
    constructor(fee: any, contract: any, contractHex: string,
                contractTx: any, contractTxHex: string, rawTx: any, secret?: string, secretHash?: string) {
        super(secret, secretHash);
        this.fee = fee;
        this.contract = contract;
        this.contractHex = contractHex;
        this.contractTx = contractTx;
        this.contractTxHex = contractTxHex;
        this.rawTx = rawTx;
    }
}
