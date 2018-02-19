import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class BchCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.BCH;
  readonly name: string = Coins[Coins.BCH].toString();
  readonly fullName: string = "Bitcoin Cash";
  readonly icon: string = "assets/icon/bch-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: BchCoinModel): BchCoinModel {
    const model = new BchCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
