import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class MkrCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.MAKER;
  readonly type: Coins = Coins.MKR;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.MKR].toString();
  readonly fullName: string = "Maker";
  readonly icon: string = "assets/icon/mkr-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(MkrCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
