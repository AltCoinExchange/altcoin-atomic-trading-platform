/**
 * Augur token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {TokenConfigMain} from "../config/tokens/tokenconfigmain";

export class AugurTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Augur.contractAddress, ethEngine);
  }
}

export class AugurTokenMainnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfigMain.Augur.contractAddress, ethEngine);
  }
}