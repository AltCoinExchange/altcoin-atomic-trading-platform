import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class AntCoinModel implements Coin {
  readonly type: Coins = Coins.ANT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ANT].toString();
  readonly fullName: string = "Aragon";
  readonly icon: string = "assets/icon/ant-icon.png";
  amount;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: AntCoinModel): AntCoinModel {
    const model = new AntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
