import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class DentCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.DENT;
  readonly name: string = Coins[Coins.DENT].toString();
  readonly fullName: string = "Dent";
  readonly icon: string = "assets/icon/dent-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: DentCoinModel): DentCoinModel {
    const model = new DentCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
