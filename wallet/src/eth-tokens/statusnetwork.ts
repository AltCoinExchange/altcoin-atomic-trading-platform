/**
 * ARAGON token interface
 */
import {EthEngine} from "../eth/eth-engine";
import {TokenConfig} from "../config/tokens/tokenconfig";
import {TokenAtomicSwap} from "../eth/tokens/token-atomic-swap";
import {TokenConfigMain} from "../config/tokens/tokenconfigmain";

export class StatusNetworkTokenTestnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfig.StatusNetwork.contractAddress, ethEngine);
  }
}

export class StatusNetworkTokenMainnet extends TokenAtomicSwap {
  constructor(ethEngine: EthEngine) {
    super(TokenConfigMain.StatusNetwork.contractAddress, ethEngine);
  }
}