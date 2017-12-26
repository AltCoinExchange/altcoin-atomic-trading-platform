import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class EosCoinModel implements Coin {
  readonly type: Coins = Coins.EOS;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.EOS].toString();
  readonly fullName: string = "EOS";
  readonly icon: string = "assets/icon/eos-icon.png";
  amount;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: EosCoinModel): EosCoinModel {
    const model = new EosCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
