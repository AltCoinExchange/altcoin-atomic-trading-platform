import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class GntCoinModel implements Coin {
  readonly type: Coins = Coins.GNT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.GNT].toString();
  readonly fullName: string = "Golem";
  readonly icon: string = "assets/icon/gnt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: GntCoinModel): GntCoinModel {
    const model = new GntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore);
    const token = ethCoinModel.getERC20Token(TOKENS.GOLEM);
    return token.faucet();
  }
}
