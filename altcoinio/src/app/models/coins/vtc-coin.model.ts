import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class VtcCoinModel implements Coin {
  readonly derive: undefined;
  readonly type = Coins.VTC;
  readonly name: string = Coins[Coins.VTC].toString();
  readonly fullName: string = "Vertcoin";
  readonly icon: string = "assets/icon/vtc-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: VtcCoinModel): VtcCoinModel {
    const model = new VtcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    throw new Error('Not implemented');
  }
}
