import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class CvcCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.CVC;
  readonly name: string = Coins[Coins.CVC].toString();
  readonly fullName: string = "Civic";
  readonly icon: string = "assets/icon/cvc-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: CvcCoinModel): CvcCoinModel {
    const model = new CvcCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore, xprivKey);
    const token = ethCoinModel.getERC20Token(TOKENS.CIVIC);
    return token.faucet();
  }
}
