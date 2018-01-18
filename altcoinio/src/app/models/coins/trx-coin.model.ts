import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class TrxCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.TRX;
  readonly name: string = Coins[Coins.TRX].toString();
  readonly fullName: string = "Tron";
  readonly icon: string = "assets/icon/trx-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: TrxCoinModel): TrxCoinModel {
    const model = new TrxCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore, xprivKey);
    const token = ethCoinModel.getERC20Token(TOKENS.TRON);
    return token.faucet();
  }
}
