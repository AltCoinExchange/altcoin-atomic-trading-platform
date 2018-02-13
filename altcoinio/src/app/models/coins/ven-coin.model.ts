import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class VenCoinModel implements Coin {
  readonly type: Coins = Coins.VEN;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.VEN].toString();
  readonly fullName: string = "VeChain";
  readonly icon: string = "assets/icon/ven-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: VenCoinModel): VenCoinModel {
    const model = new VenCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
