import {RedeemData} from "../../atomic-swap";

export class BtcRedeemData extends RedeemData {
    public redeemTx: string;
    public rawTx: any;
    constructor(redeemTx: string, rawTx: any) {
        super();
        this.redeemTx = redeemTx;
        this.rawTx = rawTx;
    }
}
