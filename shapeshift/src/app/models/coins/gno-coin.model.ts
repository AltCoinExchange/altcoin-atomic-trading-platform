import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class GnoCoinModel implements Coin {
  readonly type: Coins = Coins.GNO;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.GNO].toString();
  readonly fullName: string = "Gnosis";
  readonly icon: string = "assets/icon/gno-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: GnoCoinModel): GnoCoinModel {
    const model = new GnoCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
