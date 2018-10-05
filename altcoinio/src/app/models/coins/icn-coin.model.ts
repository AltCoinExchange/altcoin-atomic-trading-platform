import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class IcnCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.ICONOMI;
  readonly type: Coins = Coins.ICN;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ICN].toString();
  readonly fullName: string = "Iconomi";
  readonly icon: string = "assets/icon/icn-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(IcnCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
