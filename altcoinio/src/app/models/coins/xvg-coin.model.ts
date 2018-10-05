import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class XvgCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.XVG;
  readonly name: string = Coins[Coins.XVG].toString();
  readonly fullName: string = "Verge";
  readonly icon: string = "assets/icon/xvg-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: XvgCoinModel): XvgCoinModel {
    const model = new XvgCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
