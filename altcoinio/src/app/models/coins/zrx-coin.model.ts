import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class ZrxCoinModel extends Erc20CoinModel {
  token: TOKENS;
  readonly type: Coins = Coins.ZRX;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ZRX].toString();
  readonly fullName: string = "ZeroX";
  readonly icon: string = "assets/icon/zrx-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(ZrxCoinModel);
  }

  // TODO implement ERC20
  getTokens(): Promise<any> {
    throw new Error("When implemented remove this");
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
