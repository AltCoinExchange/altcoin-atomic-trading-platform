import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class AntCoinModel implements Coin {
  readonly type: Coins = Coins.ANT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.ANT].toString();
  readonly fullName: string = "Aragon";
  readonly icon: string = "assets/icon/ant-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balanceUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: AntCoinModel): AntCoinModel {
    const model = new AntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore);
    const token = ethCoinModel.getERC20Token(TOKENS.ARAGON);
    return token.faucet();
  }
}
