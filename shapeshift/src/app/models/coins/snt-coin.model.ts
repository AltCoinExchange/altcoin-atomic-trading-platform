import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class SntCoinModel implements Coin {
  readonly type: Coins = Coins.SNT;
  readonly name: string = Coins[Coins.SNT].toString();
  readonly fullName: string = "Status Network";
  readonly icon: string = "assets/icon/snt-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: SntCoinModel): SntCoinModel {
    const model = new SntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
