import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class McoCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.MONACO;
  readonly type: Coins = Coins.MCO;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.MCO].toString();
  readonly fullName: string = "Monaco";
  readonly icon: string = "assets/icon/mco-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(McoCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
