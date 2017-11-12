import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {EthWalletModel} from '../wallets/eth-wallet.model';
import {ContractResponseModel} from '../responses/contract-response.model';
import {Observable} from "rxjs/Observable";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {SwapsResponseModel} from "../responses/swaps-response.model";

export class EthCoinModel implements Coin {
  readonly timeout: number = 7200;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  amount: number;

  generateNewAddress(ethWallet: EthWalletModel) {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const xprivKey = ShapeshiftStorage.get('xprivkey');
    const keystore = eth.recover(xprivKey, "")
    return keystore.address.toString();
  }

  update(coin: Coin): Coin {
    const model = new EthCoinModel();
    model.amount = coin.amount;
    return model;
  }

  extractSecret(hashedSecret: string) {
    const eth = this.getSwapInstance();
    const result = eth.extractsecret(hashedSecret);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((result: any) => {
      console.log(result);
      const model = new SwapsResponseModel();
      model.initTimestamp = result.initTimestamp;
      model.refundTime = result.refundTime;
      model.hashedSecret = result.hashedSecret;
      model.secret = result.secret;
      model.initiator = result.initiator;
      model.participant = result.participant;
      model.value = result.value;
      model.emptied = result.emptied;
      model.state = result.state;
      // TODO: Find fee
      return model;
    });
  }

  initiate(address: string): Observable<ContractResponseModel> {
    const eth = this.getSwapInstance();
    const result = eth.initiate(this.timeout, '', address, this.amount);
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
    const eth = this.getSwapInstance();
    const result = eth.participate(this.timeout, secretHash, address, this.amount);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((result: any) => {
      console.log('participate', result);
      const model = new ContractResponseModel();
      // model.secretHash = result.secret.hashedSecret;
      model.fee = 100;
      // TODO: Find gas
      return model;
    });
  }

  redeem(secret: string, secretHash: string);
  redeem(secret: string, contract: string, contractTx: string): any;
  redeem(secret: string, secretHash: string, contractTx?: string) {
    const eth = this.getSwapInstance();
    const result = eth.redeem(secret, secretHash);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.fee = 100;
      // TODO: Find gas
      return result;
    });
  }

  refund(hashedSecret: string): any {
    const eth = this.getSwapInstance();
    const result = eth.refund(hashedSecret);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.fee = 100;
      // TODO: Find gas
      return model;
    });
  }

  private getSwapInstance(): any {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const ethPrivKey = ShapeshiftStorage.get('ethprivkey');
    const ethKeyStore = JSON.parse(ShapeshiftStorage.get('ethkeystore'));
    eth.login(ethKeyStore, ethPrivKey);
    return eth;
  }
}
