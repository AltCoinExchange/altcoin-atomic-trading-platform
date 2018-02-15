import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class SubCoinModel extends Erc20CoinModel {
  readonly token: TOKENS = TOKENS.SUBSTRATUM;
  readonly derive = undefined;
  readonly type: Coins = Coins.SUB;
  readonly name: string = Coins[Coins.SUB].toString();
  readonly fullName: string = "Substratum";
  readonly icon: string = "assets/icon/sub-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(SubCoinModel);
  }
}
