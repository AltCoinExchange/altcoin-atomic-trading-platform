import {ERC20} from "../eth/tokens/ERC20";
import * as AppConfig from "../config/config-eth";

/**
 * Augur token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {AugurConfig} from "../config/tokens/augur";

export class AugurToken extends ERC20 {
  engine: EthEngine;
  constructor() {
    super("Augur", AugurConfig.contracts[0].Augur, AppConfig.EthConfiguration.hosts[0]);
  }
}