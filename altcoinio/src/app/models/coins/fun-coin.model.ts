import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class FunCoinModel implements Coin {
  readonly type: Coins = Coins.FUN;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.FUN].toString();
  readonly fullName: string = "FunFair";
  readonly icon: string = "assets/icon/fun-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: FunCoinModel): FunCoinModel {
    const model = new FunCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
