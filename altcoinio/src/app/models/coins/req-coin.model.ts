import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class ReqCoinModel implements Coin {
  readonly type: Coins = Coins.REQ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.REQ].toString();
  readonly fullName: string = "Request Network";
  readonly icon: string = "assets/icon/req-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: ReqCoinModel): ReqCoinModel {
    const model = new ReqCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
