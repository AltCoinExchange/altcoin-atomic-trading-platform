import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {EthWallet} from "../wallets/eth-wallet";

export abstract class Erc20CoinModel implements Coin {
  abstract derive: string;
  abstract type: Coins;
  abstract name: string;
  abstract fullName: string;
  abstract icon: string;
  abstract amount: number;
  abstract faucetLoading: boolean;
  abstract $balanceUSD: Observable<number>;
  abstract walletRecord: WalletRecord;
  readonly abstract token: TOKENS;

  constructor(private coinType) {

  }

  initWallet() {
    const ethWallet = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethWallet.recover(xprivKey);
    ethWallet.login(keystore);
    return ethWallet;
  }

  getTokens() {
    const wallet = this.initWallet();
    const token = wallet.getERC20Token(this.token);
    return token.faucet();
  }

  update(coin: Coin): Coin {
    const model = new this.coinType();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  transferTo(to: string, value: number) {
    const wallet = this.initWallet();
    const token = wallet.getERC20Token(this.token);
    return Observable.fromPromise(token.transfer(to, value));
  }
}
