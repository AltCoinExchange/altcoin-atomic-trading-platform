import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class ReqCoinModel extends Erc20CoinModel {
  token: TOKENS;
  readonly type: Coins = Coins.REQ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.REQ].toString();
  readonly fullName: string = "RequestNetwork";
  readonly icon: string = "assets/icon/req-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(ReqCoinModel);
  }

  // TODO implement ERC20
  getTokens(): Promise<any> {
    throw new Error("When implemented remove this");
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
