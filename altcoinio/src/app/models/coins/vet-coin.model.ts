import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {Erc20CoinModel} from "./erc20-coin.model";

export class VetCoinModel extends Erc20CoinModel {
  token: TOKENS = TOKENS.VECHAIN;
  readonly type: Coins = Coins.VET;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.VET].toString();
  readonly fullName: string = "VeChain";
  readonly icon: string = "assets/icon/vet-icon.png";
  amount;
  faucetLoading = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(VetCoinModel);
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
