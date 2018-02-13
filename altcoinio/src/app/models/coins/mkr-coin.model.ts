import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class MkrCoinModel implements Coin {
  readonly type: Coins = Coins.MKR;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.MKR].toString();
  readonly fullName: string = "Maker";
  readonly icon: string = "assets/icon/mkr-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: MkrCoinModel): MkrCoinModel {
    const model = new MkrCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
