import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class EnjCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.ENJINCOIN;
  readonly type: Coins = Coins.ENJ;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ENJ].toString();
  readonly fullName: string = "EnjinCoin";
  readonly icon: string = "assets/icon/enj-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(EnjCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
