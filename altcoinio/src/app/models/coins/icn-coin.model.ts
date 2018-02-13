import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class IcnCoinModel implements Coin {
  readonly type: Coins = Coins.ICN;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ICN].toString();
  readonly fullName: string = "ICONOMI";
  readonly icon: string = "assets/icon/icn-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: IcnCoinModel): IcnCoinModel {
    const model = new IcnCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
