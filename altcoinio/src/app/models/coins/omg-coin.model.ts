import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class OmgCoinModel implements Coin {
  readonly type: Coins = Coins.OMG;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.OMG].toString();
  readonly fullName: string = "OmiseGO";
  readonly icon: string = "assets/icon/omg-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: OmgCoinModel): OmgCoinModel {
    const model = new OmgCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore, xprivKey);
    const token = ethCoinModel.getERC20Token(TOKENS.OMISEGO);
    return token.faucet();
  }
}
