import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class EdgCoinModel implements Coin {
  readonly type: Coins = Coins.EDG;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.EDG].toString();
  readonly fullName: string = "Edgeless";
  readonly icon: string = "assets/icon/edg-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: EdgCoinModel): EdgCoinModel {
    const model = new EdgCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
