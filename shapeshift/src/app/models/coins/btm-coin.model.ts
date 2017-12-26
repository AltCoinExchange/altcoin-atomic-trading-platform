import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class BtmCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.BTM;
  readonly name: string = Coins[Coins.BTM].toString();
  readonly fullName: string = "Bytom";
  readonly icon: string = "assets/icon/btm-icon.png";
  amount;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: BtmCoinModel): BtmCoinModel {
    const model = new BtmCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
