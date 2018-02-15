import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class SntCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.STATUSNETWORK;
  readonly derive = undefined;
  readonly type: Coins = Coins.SNT;
  readonly name: string = Coins[Coins.SNT].toString();
  readonly fullName: string = "Status Network";
  readonly icon: string = "assets/icon/snt-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(SntCoinModel);
  }
}
