import {BtcAtomicSwap} from "../../dist/src/btc/btc-atomic-swap";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";

export class BtctAtomicSwap extends BtcAtomicSwap {
    constructor(configuration: any) {
        // TODO: Find usage of RPC Configuration
        super(BtcConfiguration);
    }
}