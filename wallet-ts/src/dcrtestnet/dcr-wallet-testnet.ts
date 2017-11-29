import {BtcWallet} from "../btc";
import {DcrConfiguration} from "../config/config-dcr";

export class DcrWalletTestNet extends BtcWallet {
  constructor() {
    super(DcrConfiguration, DcrConfiguration);
  }
}
