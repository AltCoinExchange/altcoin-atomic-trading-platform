import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class TenxCoinModel extends Erc20CoinModel {
  token: TOKENS;
  readonly type: Coins = Coins.PAY;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.PAY].toString();
  readonly fullName: string = "TenXPay";
  readonly icon: string = "assets/icon/tenx-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(TenxCoinModel);
  }

  // TODO implement ERC20
  getTokens(): Promise<any> {
    throw new Error("When implemented remove this");
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
