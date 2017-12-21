import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class OmgCoinModel implements Coin {
  readonly type: Coins = Coins.OMG;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.OMG].toString();
  readonly fullName: string = "OmiseGO";
  readonly icon: string = "assets/icon/omg-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: OmgCoinModel): OmgCoinModel {
    const model = new OmgCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
