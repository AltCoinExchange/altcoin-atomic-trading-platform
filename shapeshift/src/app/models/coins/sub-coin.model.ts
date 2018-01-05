import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import { Observable } from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";

export class SubCoinModel implements Coin {
  readonly derive = undefined;
  readonly type: Coins = Coins.SUB;
  readonly name: string = Coins[Coins.SUB].toString();
  readonly fullName: string = "Substratum";
  readonly icon: string = "assets/icon/sub-icon.png";
  amount;
  faucetLoading: boolean = false;
  $balance: Observable<WalletRecord>;
  $amountUSD: Observable<number>;

  constructor() {
  }

  update(coin: SubCoinModel): SubCoinModel {
    const model = new SubCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore, xprivKey);
    const token = ethCoinModel.getERC20Token(TOKENS.SUBSTRATUM);
    return token.faucet();
  }

}
