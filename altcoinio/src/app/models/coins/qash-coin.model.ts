import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class QashCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.QASH;
  readonly type: Coins = Coins.QASH;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.QASH].toString();
  readonly fullName: string = "QASH";
  readonly icon: string = "assets/icon/qash-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(QashCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
