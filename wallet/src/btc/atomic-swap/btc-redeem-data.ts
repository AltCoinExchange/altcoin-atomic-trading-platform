import {RedeemData} from "../../atomic-swap";

export class BtcRedeemData extends RedeemData {
    public redeemTx: string;
    public rawTx: any;
    constructor(secret: string, secretHash: string, redeemTx: string, rawTx: any) {
        super(secret, secretHash);
        this.redeemTx = redeemTx;
        this.rawTx = rawTx;
    }
}
