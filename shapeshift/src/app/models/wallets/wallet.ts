import {InitiateData, ParticipateData} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {RedeemData} from "../../../../../wallet/src/atomic-swap";
import {ShapeshiftStorage} from "../../common/shapeshift-storage";
import {Coin} from "../coins/coin.model";
import {Coins} from "../coins/coins.enum";
import {BtcWallet} from "./btc-wallet";
import {EthWallet} from "./eth-wallet";

export interface Wallet {

  Initiate(address: string, coin: Coin): Observable<InitiateData>;

  Participate(data: InitiateData, coin: Coin): Observable<ParticipateData>;

  Redeem(data: RedeemData, coin: Coin): Observable<RedeemData>;
}

export class WalletFactory {
  static createWallet(coin: Coins): Wallet {
    switch (coin) {
      case Coins.BTC: {
        return new BtcWallet();
      }
      case Coins.ETH: {
        const ethCoinModel = new EthWallet();
        const xprivKey = ShapeshiftStorage.get("btcprivkey");
        const keystore = ethCoinModel.recover(xprivKey);
        ethCoinModel.login(keystore, xprivKey);
        return ethCoinModel;
      }
      default: {
        throw new Error();
      }
    }
  }
}
