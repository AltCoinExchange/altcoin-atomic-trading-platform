import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class StorjCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.STORJ;
  readonly type: Coins = Coins.STORJ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.STORJ].toString();
  readonly fullName: string = "Storj";
  readonly icon: string = "assets/icon/storj-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(StorjCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
