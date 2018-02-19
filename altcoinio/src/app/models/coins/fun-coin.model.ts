import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class FunCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.FUNFAIR;
  readonly type: Coins = Coins.FUN;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.FUN].toString();
  readonly fullName: string = "FunFair";
  readonly icon: string = "assets/icon/fun-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(FunCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
