import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class RepCoinModel extends Erc20CoinModel {
  readonly token: TOKENS = TOKENS.AUGUR;
  readonly type: Coins = Coins.REP;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.REP].toString();
  readonly fullName: string = "Augur";
  readonly icon: string = "assets/icon/rep-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(RepCoinModel);
  }

}
