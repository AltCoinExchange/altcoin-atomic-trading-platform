import {DcrWalletTestNet, BtcInitiateParams, BtcParticipateParams, BtcWalletTestNet, InitiateData, ParticipateData} from "altcoinio-wallet";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class DcrCoinModel extends DcrWalletTestNet implements Coin {
  readonly derive = undefined;
  readonly type = Coins.DCR;
  readonly name: string = Coins[Coins.DCR].toString();
  readonly icon: string = "assets/icon/dcr-icon.png";
  readonly fullName: string = "Decred";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
    super();
  }

  Participate(data: InitiateData): Observable<ParticipateData> {
    const btcParticipateParams = new BtcParticipateParams();
    btcParticipateParams.address = (<any>data).address;
    btcParticipateParams.secretHash = data.secretHash;
    btcParticipateParams.amount = this.amount;
    btcParticipateParams.privateKey = ShapeshiftStorage.get("btc-wif");
    btcParticipateParams.refundTime = 7200;
    console.log('btcParticipateParams', btcParticipateParams);
    return Observable.fromPromise(super.participate(btcParticipateParams));
  }

  Initiate(address: string): Observable<InitiateData> {
    return Observable.fromPromise(super.initiate(this.getInitParams(address)));
  }

  getInitParams(address): BtcInitiateParams {
    const wif = ShapeshiftStorage.get("btc-wif");
    return new BtcInitiateParams(7200, wif, address, this.amount);
  }

  toPersistable() {
    return {
      type: this.type,
      amount: this.amount,
    };
  }

  update(coin: DcrCoinModel): DcrCoinModel {
    const model = new DcrCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
