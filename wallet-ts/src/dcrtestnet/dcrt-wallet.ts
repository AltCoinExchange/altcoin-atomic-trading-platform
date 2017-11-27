import {BtcWallet} from "../btc";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";

export class DcrtWallet extends BtcWallet {
  constructor() {
    super(BtcConfiguration, BtcRpcConfiguration);
  }
}