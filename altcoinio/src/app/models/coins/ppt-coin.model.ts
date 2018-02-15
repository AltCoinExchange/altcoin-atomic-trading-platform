import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {Erc20CoinModel} from "./erc20-coin.model";

export class PptCoinModel extends Erc20CoinModel{
  token: TOKENS;
  readonly type: Coins = Coins.PPT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.PPT].toString();
  readonly fullName: string = "Populous";
  readonly icon: string = "assets/icon/ppt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
    super(PptCoinModel);
  }

  // TODO implement ERC20
  getTokens(): Promise<any> {
    throw new Error("When implemented remove this");
  }

  transferTo(to: string, value: number): Observable<any> {
    throw new Error("When implemented remove this");
  }

}
