export class BtcAuditContractData {
    public contractSH: any;
    public contractValue: any;
    public recipientAddress: string;
    public refundAddress: string;
    public secretHash: any;
    public lockTime: Date;

    constructor(contractSH: any, contractValue: any, recipientAddress: string,
                refundAddress: string, secretHash: any, lockTime: Date) {
        this.contractSH = contractSH;
        this.contractValue = contractValue;
        this.recipientAddress = recipientAddress;
        this.refundAddress = refundAddress;
        this.secretHash = secretHash;
        this.lockTime = lockTime;
    }
}
