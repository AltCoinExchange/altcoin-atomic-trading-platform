import {AtomicSwapAbi} from "../config/abi/atomicswap";
import {AtomicSwapBin} from "../config/abi/bin";
import * as AppConfig from "../config/config-eth";
import {EthWallet} from "../eth";

export class EthWalletTestnet extends EthWallet {
  constructor() {
    super(AtomicSwapAbi, AppConfig.EthConfiguration.hosts[0], AtomicSwapBin);
  }
}
