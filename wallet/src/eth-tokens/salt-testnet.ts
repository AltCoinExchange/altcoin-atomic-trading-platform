import {ERC20} from "../eth/tokens/ERC20";
/**
 * SALT token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class SaltTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Salt.contractAddress, ethEngine);
  }
}