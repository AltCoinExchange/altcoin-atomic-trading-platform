import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {BtcInitiateParams, InitiateData, BtcWalletTestNet} from "ts-wallet";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

export class BtcCoinModel extends BtcWalletTestNet implements Coin {
  readonly type = Coins.BTC;
  readonly name: string = Coins[Coins.BTC].toString();
  readonly icon: string = "assets/icon/btc-icon.png";
  readonly iconOutline: string = "assets/icon/btc-icon-o.png";
  readonly fullName: string = "Bitcoin";
  amount: number;

  constructor() {
    super();
  }

  Initiate(address: string): Observable<InitiateData> {
    const wif = ShapeshiftStorage.get("btc-wif");
    const btcInitParams = new BtcInitiateParams(7200, wif, address, this.amount);
    return Observable.fromPromise(super.initiate(btcInitParams));
  }

  getInitParams(): any {
    throw new Error("Method not implemented.");
  }

  toPersistable() {
    return {
      type: this.type,
      amount: this.amount,
    };
  }

  update(coin: BtcCoinModel): BtcCoinModel {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }

}
