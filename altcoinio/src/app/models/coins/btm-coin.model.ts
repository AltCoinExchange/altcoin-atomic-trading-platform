import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class BtmCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.BYTOM;
  readonly derive = undefined;
  readonly type: Coins = Coins.BTM;
  readonly name: string = Coins[Coins.BTM].toString();
  readonly fullName: string = "Bytom";
  readonly icon: string = "assets/icon/btm-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(BtmCoinModel);
  }
}
