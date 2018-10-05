import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class TrxCoinModel extends Erc20CoinModel {
  readonly token: TOKENS = TOKENS.TRON;
  readonly type: Coins = Coins.TRX;
  readonly name = Coins[Coins.TRX].toString();
  readonly fullName: string = "Tron";
  readonly icon: string = "assets/icon/trx-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(TrxCoinModel);
  }
}
