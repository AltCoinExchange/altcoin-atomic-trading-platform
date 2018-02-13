import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class EthosCoinModel implements Coin {
  readonly type: Coins = Coins.ETHOS;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ETHOS].toString();
  readonly fullName: string = "Ethos";
  readonly icon: string = "assets/icon/ethos-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: EthosCoinModel): EthosCoinModel {
    const model = new EthosCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
