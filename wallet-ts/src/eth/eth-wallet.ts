import {AtomicSwapAbi} from "../config/abi/atomicswap";
import {AtomicSwapBin} from "../config/abi/bin";
import * as AppConfig from "../config/config-eth";
import {EthAtomicSwap} from "./eth-atomic-swap";

export class EthWallet extends EthAtomicSwap {

  constructor() {
    super(AtomicSwapAbi, AppConfig.EthConfiguration.hosts[0], AtomicSwapBin);
  }

}
