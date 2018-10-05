import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class GnoCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.GNOSIS;
  readonly type: Coins = Coins.GNO;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.GNO].toString();
  readonly fullName: string = "Gnosis";
  readonly icon: string = "assets/icon/gno-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(GnoCoinModel);
  }
}
