import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class PartCoinModel implements Coin {
  readonly derive: undefined;
  readonly type = Coins.PART;
  readonly name: string = Coins[Coins.PART].toString();
  readonly fullName: string = "Particl";
  readonly icon: string = "assets/icon/part-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: PartCoinModel): PartCoinModel {
    const model = new PartCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
