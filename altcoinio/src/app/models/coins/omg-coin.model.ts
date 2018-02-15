import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class OmgCoinModel extends Erc20CoinModel {
  readonly token: TOKENS = TOKENS.OMISEGO;
  readonly type: Coins = Coins.OMG;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.OMG].toString();
  readonly fullName: string = "OmiseGO";
  readonly icon: string = "assets/icon/omg-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(OmgCoinModel);
  }
}
