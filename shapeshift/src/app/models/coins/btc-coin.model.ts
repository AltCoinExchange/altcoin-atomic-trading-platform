import {Observable} from "rxjs/Observable";
import {BtcInitiateParams, BtcWalletTestNet, InitiateData} from "ts-wallet";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";

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

  update(coin: BtcCoinModel): BtcCoinModel {
    const model = new BtcCoinModel();
    model.amount = coin.amount;
    return model;
  }

}
