import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class TenxCoinModel implements Coin {
  readonly type: Coins = Coins.PAY;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.PAY].toString();
  readonly fullName: string = "TenXPay";
  readonly icon: string = "assets/icon/tenx-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: TenxCoinModel): TenxCoinModel {
    const model = new TenxCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
