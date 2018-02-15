import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class BatCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.BAT;
  readonly type: Coins = Coins.BAT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.BAT].toString();
  readonly fullName: string = "BAT";
  readonly icon: string = "assets/icon/bat-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(BatCoinModel);
  }
}
