import {BtcWallet, RegenerateBitcoinWallet} from "../btc";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";

export class BtcWalletTestNet extends BtcWallet {
  constructor(params: RegenerateBitcoinWallet) {
    super(BtcConfiguration, BtcRpcConfiguration, params);
  }
}
