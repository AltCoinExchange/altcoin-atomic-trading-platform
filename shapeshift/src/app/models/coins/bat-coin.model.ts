import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class BatCoinModel implements Coin {
  readonly type: Coins = Coins.BAT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.BAT].toString();
  readonly fullName: string = "BAT";
  readonly icon: string = "assets/icon/bat-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: BatCoinModel): BatCoinModel {
    const model = new BatCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
