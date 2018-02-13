import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class LtcCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.LTC;
  readonly name: string = Coins[Coins.LTC].toString();
  readonly fullName: string = "Litecoin";
  readonly icon: string = "assets/icon/ltc-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: LtcCoinModel): LtcCoinModel {
    const model = new LtcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
