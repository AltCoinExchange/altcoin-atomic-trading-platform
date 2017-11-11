import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {EthWalletModel} from '../wallets/eth-wallet.model';

export class EthCoinModel implements Coin {

  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  amount: number;

  generateNewAddress(ethWallet: EthWalletModel) {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const acc = eth.create(ethWallet.privateKey);
    localStorage.setItem('ethkeystore', JSON.stringify(acc.keystore));
    return acc.wallet.address.toString();
  }

  update(coin: Coin): Coin {
    const model = new EthCoinModel();
    model.amount = coin.amount;
    return model;
  }

  initiate(address: string): any {
    return undefined;
  }

  participate(address: string, secretHash: string): any {
    return undefined;
  }

  redeem(secret: string, secretHash: string);
  redeem(secret: string, contract: string, contractTx: string): any;
  redeem(secret: string, secretHash: string, contractTx?: string) {
  }

  refund(hashedSecret: string);
  refund(contract: string, contractTx: string): any;
  refund(address: string, contractTx?: string) {
  }

}
