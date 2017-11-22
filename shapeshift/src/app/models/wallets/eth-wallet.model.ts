import {WalletModel} from './wallet.model';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';
import {SwapsResponseModel} from '../responses/swaps-response.model';
import {Observable} from 'rxjs/Observable';
import {ContractResponseModel} from '../responses/contract-response.model';
import {EthWallet} from '../../../../../wallet/src/wallet-eth';

export class EthWalletModel extends WalletModel {
  keystore: {};
  timeout = 7200;
  xprivKey: '';
  mnemonic: string[];
  eth: any;

  generateNewAddress(key: string) {
    const eth = new EthWallet();
    const keystore = eth.recover(key, '');
    return keystore.address.toString();
  }

  initialize(key?, codesPhrase?: string[], keystore?: any) {
    this.xprivKey = key;
    this.mnemonic = codesPhrase;
    this.keystore = keystore;

    this.eth = new EthWallet();
    this.eth.login(keystore, key);
    return this.eth;
  }

  getBalance(address: string) {
    const result = this.eth.getbalance(address);
    const resultObservable = Observable.fromPromise(result);
    return resultObservable;
  }

  extractSecret(data) {
    const hash = data.secretHash.indexOf('0x') === -1 ? '0x' + data.secretHash : data.secretHash;

    const res = this.eth.extractsecret(hash);
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
    const res = this.eth.initiate(this.timeout, '', address, amount);
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
    const result = this.eth.participate(this.timeout, secretHash, address, amount);
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
    const hash = data.secretHash.indexOf('0x') === -1 ? '0x' + data.secretHash : data.secretHash;
    const secret = data.secret.indexOf('0x') === -1 ? '0x' + data.secret : data.secret;
    const result = this.eth.redeem(secret, hash);
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
    const res = this.eth.refund(hashedSecret);
    const resultObservable = Observable.fromPromise(res);
    return resultObservable.map((result: any) => {
      const model = new ContractResponseModel();
      model.fee = 100;
      // TODO: Find gas
      return model;
    });
  }

  constructor(xprivKey?, keystore?: any, codesPhrase?: string[]) {
    super();
    this.initialize(xprivKey, codesPhrase, keystore);
  }

  privateKey(): string {
    return this.xprivKey;
  }
}
