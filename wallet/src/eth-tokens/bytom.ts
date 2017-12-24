/**
 * ARAGON token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {TokenConfigMain} from "../config/tokens/tokenconfigmain";

export class BytomTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.Bytom.contractAddress, ethEngine);
  }
}

export class BytomTokenMainnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfigMain.Bytom.contractAddress, ethEngine);
  }
}