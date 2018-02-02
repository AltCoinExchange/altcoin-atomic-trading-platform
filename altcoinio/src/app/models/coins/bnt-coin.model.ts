import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class BntCoinModel implements Coin {
  readonly type: Coins = Coins.BNT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.BNT].toString();
  readonly fullName: string = "Bancor";
  readonly icon: string = "assets/icon/bnt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: BntCoinModel): BntCoinModel {
    const model = new BntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
