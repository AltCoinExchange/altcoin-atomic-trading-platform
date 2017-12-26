import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class RepCoinModel implements Coin {
  readonly type: Coins = Coins.REP;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.REP].toString();
  readonly fullName: string = "Augur";
  readonly icon: string = "assets/icon/rep-icon.png";
  amount;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: RepCoinModel): RepCoinModel {
    const model = new RepCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
