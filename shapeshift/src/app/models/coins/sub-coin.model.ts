import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class SubCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.SUB;
  readonly name: string = Coins[Coins.SUB].toString();
  readonly fullName: string = "Substatum";
  readonly icon: string = "assets/icon/sub-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: SubCoinModel): SubCoinModel {
    const model = new SubCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
