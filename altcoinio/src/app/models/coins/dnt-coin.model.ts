import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class DntCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.DISTRICT0X;
  readonly derive = undefined;
  readonly type: Coins = Coins.DNT;
  readonly name: string = Coins[Coins.DNT].toString();
  readonly fullName: string = "district0x";
  readonly icon: string = "assets/icon/dnt-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(DntCoinModel);
  }
}
