import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class EosCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.EOS;
  readonly type: Coins = Coins.EOS;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.EOS].toString();
  readonly fullName: string = "EOS";
  readonly icon: string = "assets/icon/eos-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(EosCoinModel);
  }

}
