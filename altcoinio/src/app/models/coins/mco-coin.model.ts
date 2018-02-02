import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class McoCoinModel implements Coin {
  readonly type: Coins = Coins.MCO;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.MCO].toString();
  readonly fullName: string = "Monaco";
  readonly icon: string = "assets/icon/mco-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: McoCoinModel): McoCoinModel {
    const model = new McoCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    
  }

}
