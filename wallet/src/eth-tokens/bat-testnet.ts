import {ERC20} from "../eth/tokens/ERC20";
/**
 * BAT token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class BatTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Bat.contractAddress, ethEngine);
  }
}