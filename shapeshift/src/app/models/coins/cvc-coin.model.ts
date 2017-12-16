import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class CvcCoinModel implements Coin {
  readonly type: Coins = Coins.CVC;
  readonly name: string = Coins[Coins.CVC].toString();
  readonly fullName: string = "Civic";
  readonly icon: string = "assets/icon/cvc-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: CvcCoinModel): CvcCoinModel {
    const model = new CvcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
