/**
 * Golem token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";

export class GolemTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Golem.contractAddress, ethEngine);
  }
}
