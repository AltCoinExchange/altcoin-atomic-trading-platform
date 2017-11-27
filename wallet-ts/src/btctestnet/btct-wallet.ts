import {BtcWallet} from "../btc";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";

export class BtcWalletTestNet extends BtcWallet {
  constructor() {
    super(BtcConfiguration, BtcRpcConfiguration);
  }
}
