import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class EthosCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.ETHOS;
  readonly type: Coins = Coins.ETHOS;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ETHOS].toString();
  readonly fullName: string = "Ethos";
  readonly icon: string = "assets/icon/ethos-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(EthosCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }
}
