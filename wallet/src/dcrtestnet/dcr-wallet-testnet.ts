import {BitcoinWallet} from "../btc";

export class DcrWalletTestNet extends BitcoinWallet {
    constructor() {
        super("testnet");
    }
}
