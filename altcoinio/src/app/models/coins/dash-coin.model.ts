import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class DashCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.DASH;
  readonly name: string = Coins[Coins.DASH].toString();
  readonly fullName: string = "DASH";
  readonly icon: string = "assets/icon/dash-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: DashCoinModel): DashCoinModel {
    const model = new DashCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
