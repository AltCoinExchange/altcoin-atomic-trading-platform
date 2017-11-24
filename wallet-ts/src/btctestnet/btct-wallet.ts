import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";
import {BtcWallet, RegenerateBitcoinWallet} from "../btc";

export class BtctWallet extends BtcWallet {
    constructor(params: RegenerateBitcoinWallet) {
        super(BtcConfiguration, BtcRpcConfiguration, params);
    }
}