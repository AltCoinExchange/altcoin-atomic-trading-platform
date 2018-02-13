import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class QashCoinModel implements Coin {
  readonly type: Coins = Coins.QASH;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.QASH].toString();
  readonly fullName: string = "QASH";
  readonly icon: string = "assets/icon/qash-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: QashCoinModel): QashCoinModel {
    const model = new QashCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
