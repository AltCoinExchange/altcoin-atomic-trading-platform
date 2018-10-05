import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class CvcCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.CIVIC;
  readonly type: Coins = Coins.CVC;
  readonly name: string = Coins[Coins.CVC].toString();
  readonly fullName: string = "Civic";
  readonly icon: string = "assets/icon/cvc-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(CvcCoinModel);
  }
}
