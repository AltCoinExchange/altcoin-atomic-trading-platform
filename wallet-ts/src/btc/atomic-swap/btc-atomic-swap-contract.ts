export class BtcAtomicSwapData {
    secretHash: any;
    recipientHash: any;
    lockTime: any;
    refundHash160: any;
    constructor(secretHash: any, recipientHash: any, lockTime: any, refundHash160: any) {
        this.secretHash = secretHash;
        this.recipientHash = recipientHash;
        this.lockTime = lockTime;
        this.refundHash160 = refundHash160;
    }
}
