import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class AntCoinModel extends Erc20CoinModel {
  readonly type: Coins = Coins.ANT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ANT].toString();
  readonly fullName: string = "Aragon";
  readonly icon: string = "assets/icon/ant-icon.png";

  readonly token: TOKENS = TOKENS.ARAGON;

  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(AntCoinModel);
  }
}
