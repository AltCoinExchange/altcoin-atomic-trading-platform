import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class SaltCoinModel extends Erc20CoinModel {
  readonly token: TOKENS = TOKENS.SALT;
  readonly type: Coins = Coins.SALT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.SALT].toString();
  readonly fullName: string = "SALT";
  readonly icon: string = "assets/icon/salt-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(SaltCoinModel);
  }
}
