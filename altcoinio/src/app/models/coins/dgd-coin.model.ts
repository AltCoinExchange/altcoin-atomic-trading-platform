import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class DgdCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.DIGIXDAO;
  readonly type: Coins = Coins.DGD;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.DGD].toString();
  readonly fullName: string = "DigixDAO";
  readonly icon: string = "assets/icon/dgd-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(DgdCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
