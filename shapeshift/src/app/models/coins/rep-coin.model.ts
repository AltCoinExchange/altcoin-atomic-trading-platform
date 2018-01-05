import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

export class RepCoinModel implements Coin {
  readonly type: Coins = Coins.REP;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.REP].toString();
  readonly fullName: string = "Augur";
  readonly icon: string = "assets/icon/rep-icon.png";
  amount;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: RepCoinModel): RepCoinModel {
    const model = new RepCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  faucet(){
    const ethCoinModel = new EthWallet();
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore, xprivKey);
    const token = ethCoinModel.getERC20Token(TOKENS.AUGUR);
    return Observable.fromPromise(token.faucet());
  }

}
