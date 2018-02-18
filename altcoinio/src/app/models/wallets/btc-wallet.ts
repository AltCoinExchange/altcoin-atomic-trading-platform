import {
  BtcInitiateParams,
  BtcParticipateParams,
  BitcoinWallet,
  InitiateData,
  ParticipateData,
  RedeemData,
  BtcRedeemParams
} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {BtcCoinModel} from "../coins/btc-coin.model";
import {Wallet} from "./wallet";

export class BtcWallet extends BitcoinWallet implements Wallet {

  constructor() {
    super();
  }

  Participate(data: InitiateData, btc: BtcCoinModel): Observable<ParticipateData> {
    // tslint:disable-next-line
    console.log("PARTICIPATING BTC:... ", InitiateData);
    const privateKey = AltcoinioStorage.get("btc-wif")
    const btcParticipateParams = new BtcParticipateParams(48, privateKey, data.address, btc.amount, data.secretHash);
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

  Redeem(data: RedeemData, btc: BtcCoinModel): Observable<RedeemData> {
    const redeemParams = this.getRedeemParams(this.unoxify(data.secret), this.unoxify(data.secretHash), data.contractBin, data.contractTx);
    return Observable.fromPromise(
      super.redeem(
        redeemParams,
      ),
    );
  }

  getInitParams(address: string, amount: number): BtcInitiateParams {
    const wif = AltcoinioStorage.get("btc-wif");
    return new BtcInitiateParams(48, wif, address, amount);
  }

  getRedeemParams(secret: string, hashedsecret: string, contractBin, contractTx): BtcRedeemParams {
    const wif = AltcoinioStorage.get("btc-wif");
    return new BtcRedeemParams(secret, hashedsecret, contractBin, contractTx, wif);
  }

  unoxify(param: string): string {
    return param.indexOf("0x") !== -1 ? param.slice(2) : param
  }
}
