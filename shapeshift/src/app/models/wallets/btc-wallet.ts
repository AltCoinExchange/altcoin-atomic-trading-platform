import {
  BtcInitiateParams,
  BtcParticipateParams,
  BtcWalletTestNet,
  InitiateData,
  ParticipateData,
} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {BtcCoinModel} from "../coins/btc-coin.model";
import {Wallet} from "./wallet";

export class BtcWallet extends BtcWalletTestNet implements Wallet {

  constructor() {
    super();
  }

  Participate(data: InitiateData, btc: BtcCoinModel): Observable<ParticipateData> {
    const btcParticipateParams = new BtcParticipateParams();
    btcParticipateParams.address = (<any>data).address;
    btcParticipateParams.secretHash = data.secretHash;
    btcParticipateParams.amount = btc.amount;
    btcParticipateParams.privateKey = ShapeshiftStorage.get("btc-wif");
    btcParticipateParams.refundTime = 7200;
    console.log("btcParticipateParams", btcParticipateParams);
    return Observable.fromPromise(super.participate(btcParticipateParams));
  }

  Initiate(address: string, btc: BtcCoinModel): Observable<InitiateData> {
    const initParams = this.getInitParams(address, btc.amount);
    return Observable.fromPromise(
      super.initiate(
        initParams,
      ),
    );
  }

  getInitParams(address: string, amount: number): BtcInitiateParams {
    const wif = ShapeshiftStorage.get("btc-wif");
    return new BtcInitiateParams(7200, wif, address, amount);
  }
}
