import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class TrxCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.TRX;
  readonly name: string = Coins[Coins.TRX].toString();
  readonly fullName: string = "Tron";
  readonly icon: string = "assets/icon/trx-icon.png";
  amount: number = 0;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: TrxCoinModel): TrxCoinModel {
    const model = new TrxCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
