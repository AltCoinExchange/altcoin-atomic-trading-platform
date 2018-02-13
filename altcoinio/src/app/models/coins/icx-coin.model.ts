import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class IcxCoinModel implements Coin {
  readonly type: Coins = Coins.ICX;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ICX].toString();
  readonly fullName: string = "ICON";
  readonly icon: string = "assets/icon/icx-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: IcxCoinModel): IcxCoinModel {
    const model = new IcxCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
