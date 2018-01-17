import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class BtcCoinModel implements Coin {
  readonly derive: undefined;
  readonly type = Coins.BTC;
  readonly name: string = Coins[Coins.BTC].toString();
  readonly fullName: string = "Bitcoin";
  readonly icon: string = "assets/icon/btc-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: BtcCoinModel): BtcCoinModel {
    const model = new BtcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }
}
