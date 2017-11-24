import {ExtractSecretData} from "../../atomic-swap";

export class BtcAtomicSwapData extends ExtractSecretData {
    secretHash: any;
    recipientHash: any;
    lockTime: any;
    refundHash160: any;
    constructor(secretHash: any, recipientHash: any, lockTime: any, refundHash160: any) {
        super();
        this.secretHash = secretHash;
        this.recipientHash = recipientHash;
        this.lockTime = lockTime;
        this.refundHash160 = refundHash160;
    }
}
