import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class DentCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.DENT;
  readonly type: Coins = Coins.DENT;
  readonly name: string = Coins[Coins.DENT].toString();
  readonly fullName: string = "Dent";
  readonly icon: string = "assets/icon/dent-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(DentCoinModel);
  }
}
