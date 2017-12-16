import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class DntCoinModel implements Coin {
  readonly type: Coins = Coins.DNT;
  readonly name: string = Coins[Coins.DNT].toString();
  readonly fullName: string = "district0x";
  readonly icon: string = "assets/icon/dnt-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: DntCoinModel): DntCoinModel {
    const model = new DntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
