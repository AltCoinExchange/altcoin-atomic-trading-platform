import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class PptCoinModel implements Coin {
  readonly type: Coins = Coins.PPT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.PPT].toString();
  readonly fullName: string = "Populous";
  readonly icon: string = "assets/icon/ppt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: PptCoinModel): PptCoinModel {
    const model = new PptCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
