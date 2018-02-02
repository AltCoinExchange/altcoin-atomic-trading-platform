import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class DgdCoinModel implements Coin {
  readonly type: Coins = Coins.DGD;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.DGD].toString();
  readonly fullName: string = "DigixDAO";
  readonly icon: string = "assets/icon/dgd-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: DgdCoinModel): DgdCoinModel {
    const model = new DgdCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
