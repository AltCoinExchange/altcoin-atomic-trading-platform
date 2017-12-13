import {ERC20} from "../eth/tokens/ERC20";
/**
 * Golem token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class GolemTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Golem.contractAddress, ethEngine);
  }
}