import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class SaltCoinModel implements Coin {
  readonly type: Coins = Coins.SALT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.SALT].toString();
  readonly fullName: string = "SALT";
  readonly icon: string = "assets/icon/salt-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: SaltCoinModel): SaltCoinModel {
    const model = new SaltCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
