import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class BntCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.BANCOR;
  readonly type: Coins = Coins.BNT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.BNT].toString();
  readonly fullName: string = "Bancor";
  readonly icon: string = "assets/icon/bnt-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(BntCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
