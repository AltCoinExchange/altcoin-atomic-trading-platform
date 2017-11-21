import {WalletModel} from './wallet.model';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';
import {SwapsResponseModel} from '../responses/swaps-response.model';
import {Observable} from 'rxjs/Observable';
import {ContractResponseModel} from '../responses/contract-response.model';
import * as wallet from 'wallet';

export class EthWalletModel extends WalletModel {
  keystore: {};
  timeout = 7200;
  xprivKey: '';
  mnemonic: string[];

  generateNewAddress(key?: string) {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const keystore = eth.recover(key, '');
    return keystore.address.toString();
  }

  initialize(xprivKey?, codesPhrase?: string[]) {
    this.xprivKey = xprivKey;
    this.mnemonic = codesPhrase;
  }

  getBalance(address: string) {
    const eth = this.getSwapInstance();
    const result = eth.getbalance(address);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable;
  }

  extractSecret(data) {
    const eth = this.getSwapInstance();
    const hash = data.secretHash.indexOf('0x') === -1 ? '0x' + data.secretHash : data.secretHash;

    const res = eth.extractsecret(hash);
    const resultObservable = Observable.fromPromise(res);
    return resultObservable.map((result: any) => {

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
      return result.secret;
    });
  }

  initiate(address: string, amount: number): Observable<ContractResponseModel> {
    const eth = this.getSwapInstance();
    const res = eth.initiate(this.timeout, '', address, amount);
    const resultObservable = Observable.fromPromise(res);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.secret = result.secret.secret;
      model.secretHash = result.secret.hashedSecret;
      model.fee = 100;
      // TODO: Find fee
      return model;
    });
  }

  participate(address: string, secretHash: string, amount: number): any {
    const eth = this.getSwapInstance();
    const result = eth.participate(this.timeout, secretHash, address, amount);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((res: any) => {
      console.log('participate');
      const model = new ContractResponseModel();
      model.fee = 100;
      model.secretHash = secretHash;
      // TODO: Find gas
      return res;
    });
  }

  redeem(data) {
    const eth = this.getSwapInstance();
    const hash = data.secretHash.indexOf('0x') === -1 ? '0x' + data.secretHash : data.secretHash;
    const secret = data.secret.indexOf('0x') === -1 ? '0x' + data.secret : data.secret;
    const result = eth.redeem(secret, hash);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable.map((res: any) => {
      console.log('REDEEM');
      console.log(res);
      const model = new ContractResponseModel();
      model.fee = 100;
      // TODO: Find gas
      return model;
    });
  }

  refund(hashedSecret: string): any {
    const eth = this.getSwapInstance();
    const res = eth.refund(hashedSecret);
    const resultObservable = Observable.fromPromise(res);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.fee = 100;
      // TODO: Find gas
      return model;
    });
  }

  constructor(xprivKey?, codesPhrase?: string[]) {
    super();
    this.initialize(xprivKey, codesPhrase);
  }

  private getSwapInstance(): any {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const ethPrivKey = ShapeshiftStorage.get('ethprivkey');
    const ethKeyStore = JSON.parse(ShapeshiftStorage.get('ethkeystore'));
    eth.login(ethKeyStore, ethPrivKey);
    return eth;
  }

  privateKey(): string {
    return this.privKey;
  }
}
