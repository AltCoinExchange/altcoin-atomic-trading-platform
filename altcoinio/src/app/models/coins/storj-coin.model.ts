import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class StorjCoinModel implements Coin {
  readonly type: Coins = Coins.STORJ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.STORJ].toString();
  readonly fullName: string = "Storj";
  readonly icon: string = "assets/icon/storj-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: StorjCoinModel): StorjCoinModel {
    const model = new StorjCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
