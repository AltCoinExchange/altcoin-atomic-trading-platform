import {ERC20} from "../eth/tokens/ERC20";
/**
 * ARAGON token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class AragonTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Aragon.contractAddress, ethEngine);
  }
}