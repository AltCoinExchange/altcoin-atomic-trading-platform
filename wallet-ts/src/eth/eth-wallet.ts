import {IEthAccount} from "./eth-account";
import {EthAtomicSwap} from "./eth-atomic-swap";

export class EthWallet extends EthAtomicSwap {

  constructor(abi, eth, bin) {
    super(abi, eth, bin);
  }

  public login(keystore, password) {
    return this.engine.login(keystore, password);
  }

  public create(password): IEthAccount {
    return this.engine.createAccount(password);
  }

  public recover(privateKey, password?) {
    return this.engine.recoverAccount(privateKey, password);
  }

  public async getbalance(address) {
    return await this.engine.getBalance(address);
  }

  public sendAllEther(privateKey, toAddress) {
    return this.engine.sendAllEther(privateKey, toAddress);
  }
}
