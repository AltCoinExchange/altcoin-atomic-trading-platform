import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class EnjCoinModel implements Coin {
  readonly type: Coins = Coins.ENJ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ENJ].toString();
  readonly fullName: string = "EnjinCoin";
  readonly icon: string = "assets/icon/enj-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: EnjCoinModel): EnjCoinModel {
    const model = new EnjCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
