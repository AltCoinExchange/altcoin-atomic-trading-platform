import {AtomicSwapAbi} from "../config/abi/atomicswap";
import {AtomicSwapBin} from "../config/abi/bin";
import * as AppConfig from "../config/config-eth";
import {EthAtomicSwap} from "./eth-atomic-swap";

export class EthWallet extends EthAtomicSwap {

  constructor() {
    super(AtomicSwapAbi, AppConfig.EthConfiguration.hosts[0], AtomicSwapBin);
  }

  public login(keystore, password) {
    return this.engine.login(keystore, password);
  }

  public create(password): IEthAccount {
    return this.engine.createAccount(password);
  }

  public recover(privateKey, password) {
    return this.engine.recoverAccount(privateKey, password);
  }

  public async getbalance(address) {
    return await this.engine.getBalance(address);
  }

  public sendAllEther(privateKey, toAddress) {
    return this.engine.sendAllEther(privateKey, toAddress);
  }
}
