import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class GntCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.GOLEM;
  readonly type: Coins = Coins.GNT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.GNT].toString();
  readonly fullName: string = "Golem";
  readonly icon: string = "assets/icon/gnt-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(GntCoinModel);
  }
}
