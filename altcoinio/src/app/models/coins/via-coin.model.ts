import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class ViaCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.VIA;
  readonly name: string = Coins[Coins.VIA].toString();
  readonly fullName: string = "Viacoin";
  readonly icon: string = "assets/icon/via-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: ViaCoinModel): ViaCoinModel {
    const model = new ViaCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
