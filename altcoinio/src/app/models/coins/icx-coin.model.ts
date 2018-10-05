import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class IcxCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.ICON;
  readonly type: Coins = Coins.ICX;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ICX].toString();
  readonly fullName: string = "ICON";
  readonly icon: string = "assets/icon/icx-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(IcxCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
