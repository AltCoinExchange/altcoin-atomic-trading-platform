/**
 * ARAGON token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {TokenConfigMain} from "../config/tokens/tokenconfigmain";

export class CivicTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Civic.contractAddress, ethEngine);
  }
}

export class CivicTokenMainnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfigMain.Civic.contractAddress, ethEngine);
  }
}