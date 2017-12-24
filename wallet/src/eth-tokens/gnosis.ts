/**
 * GNOSIS token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {TokenConfigMain} from "../config/tokens/tokenconfigmain";

export class GnosisTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Gnosis.contractAddress, ethEngine);
  }
}

export class GnosisTokenMainnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfigMain.Gnosis.contractAddress, ethEngine);
  }
}