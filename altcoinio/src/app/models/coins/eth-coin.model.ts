import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";

export class EthCoinModel implements Coin {
  readonly derive: undefined;
  readonly type: Coins = Coins.ETH;
  readonly name: string = Coins[Coins.ETH].toString();
  readonly fullName: string = "Ethereum";
  readonly icon: string = "assets/icon/eth-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: EthCoinModel): EthCoinModel {
    const model = new EthCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
