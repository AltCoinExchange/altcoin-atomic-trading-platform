import {ERC20} from "../eth/tokens/ERC20";
/**
 * EOS token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";

export class EosTokenTestnet extends ERC20 {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Eos.contractAddress, ethEngine);
  }
}