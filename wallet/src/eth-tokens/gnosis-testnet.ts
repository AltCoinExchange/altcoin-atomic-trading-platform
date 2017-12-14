import {ERC20} from "../eth/tokens/ERC20";
/**
 * GNOSIS token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class GnosisTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Gnosis.contractAddress, ethEngine);
  }
}