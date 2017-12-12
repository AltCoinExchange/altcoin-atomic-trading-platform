import {ERC20} from "../eth/tokens/ERC20";
/**
 * Augur token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {AugurConfig} from "../config/tokens/augur";

export class AugurTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super("Augur", AugurConfig.contracts[2].LegacyReputationToken, ethEngine);
  }
}