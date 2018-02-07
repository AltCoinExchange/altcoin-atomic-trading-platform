import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class SntCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.SNT;
  readonly name: string = Coins[Coins.SNT].toString();
  readonly fullName: string = "Status Network";
  readonly icon: string = "assets/icon/snt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: SntCoinModel): SntCoinModel {
    const model = new SntCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore);
    const token = ethCoinModel.getERC20Token(TOKENS.STATUSNETWORK);
    return token.faucet();
  }
}
