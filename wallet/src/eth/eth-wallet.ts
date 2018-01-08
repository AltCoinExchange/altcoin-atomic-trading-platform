import {IEthAccount} from "./eth-account";
import {EthAtomicSwap} from "./eth-atomic-swap";

export class EthereumWallet extends EthAtomicSwap {
  public walletAddress: string = undefined;

  constructor(net: string = "testnet") {
    super(net);
  }

  public login(keystore, password) {
    const acc = this.engine.login(keystore, password);
    if (acc.address.length > 2) {
      this.walletAddress = acc.address.slice(2);
    }
    return acc;
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

  public isWebSocketAlive() {
    return this.engine.isListening();
  }
}
