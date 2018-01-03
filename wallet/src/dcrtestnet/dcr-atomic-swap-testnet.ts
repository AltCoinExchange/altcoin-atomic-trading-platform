import {BtcAtomicSwap} from "../btc/btc-atomic-swap";
import {DcrConfiguration} from "../config/config-dcr";

export class DcrAtomicSwapTestnet extends BtcAtomicSwap {
    constructor(configuration: any) {
        // TODO: Find usage of RPC Configuration
        super("testnet");
    }
}
