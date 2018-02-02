import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class ZrxCoinModel implements Coin {
  readonly type: Coins = Coins.ZRX;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ZRX].toString();
  readonly fullName: string = "0x";
  readonly icon: string = "assets/icon/zrx-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: ZrxCoinModel): ZrxCoinModel {
    const model = new ZrxCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
