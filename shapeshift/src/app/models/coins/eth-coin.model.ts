import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {EthWalletModel} from '../wallets/eth-wallet.model';
import {ContractResponseModel} from '../responses/contract-response.model';
import {Observable} from "rxjs/Observable";

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

  initiate(address: string): Observable<ContractResponseModel> {
    const eth = this.getSwapInstance();
    const result = eth.initiate(7200, '', address, this.amount);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.secret = result.secret.secret;
      model.secretHash = result.secret.hashedSecret;
      model.fee = 100;
      // TODO: Find fee
      return model;
    });
  }

  participate(address: string, secretHash: string): any {
  }

  redeem(secret: string, secretHash: string);
  redeem(secret: string, contract: string, contractTx: string): any;
  redeem(secret: string, secretHash: string, contractTx?: string) {
  }

  refund(hashedSecret: string);
  refund(contract: string, contractTx: string): any;
  refund(address: string, contractTx?: string) {
  }

  private getSwapInstance(): any {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const ethPrivKey = localStorage.getItem('ethprivkey');
    const ethKeyStore = JSON.parse(localStorage.getItem('ethkeystore'));
    eth.login(ethKeyStore, ethPrivKey);
    return eth;
  }
}
