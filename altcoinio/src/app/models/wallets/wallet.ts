import {InitiateData, ParticipateData, RedeemData, TOKENS} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {Coin} from "../coins/coin.model";
import {Coins} from "../coins/coins.enum";
import {BtcWallet} from "./btc-wallet";
import {EthWallet} from "./eth-wallet";
import {EthTokenWallet} from "./eth-token-wallet";

export interface Wallet {
  Initiate(address: string, coin: Coin): Observable<InitiateData>;

  Participate(data: InitiateData, coin: Coin): Observable<ParticipateData>;

  Redeem(data: RedeemData, coin: Coin): Observable<RedeemData>;
}

export class WalletFactory {
  static createWalletFromString(coin: string){
    return this.createWallet(Coins[coin]);
  }
  static createWallet(coin: Coins): Wallet {
    switch (coin) {
      case Coins.BTC: {
        return new BtcWallet();
      }
      case Coins.ETH: {
        const ethCoinModel = new EthWallet();
        const xprivKey = AltcoinioStorage.get("btcprivkey");
        const keystore = ethCoinModel.recover(xprivKey);
        ethCoinModel.login(keystore, xprivKey);
        return ethCoinModel;
      }
      case Coins.SNT:
      case Coins.DNT:
      case Coins.CVC:
      case Coins.EOS:
      case Coins.GNT:
      case Coins.SALT:
      case Coins.TRX:
      case Coins.SUB:
      case Coins.OMG:
      case Coins.ANT:
      case Coins.GNO:
      case Coins.BAT:
      case Coins.REP: {
        let token: TOKENS = null;
        switch (coin) {
          case Coins.BAT: {
            token = TOKENS.BAT;
            break;
          }
          case Coins.GNO: {
            token = TOKENS.GNOSIS;
            break;
          }
          case Coins.TRX: {
            token = TOKENS.TRON;
            break;
          }
          case Coins.ANT: {
            token = TOKENS.ARAGON;
            break;
          }
          case Coins.OMG: {
            token = TOKENS.OMISEGO;
            break;
          }
          case Coins.SUB: {
            token = TOKENS.SUBSTRATUM;
            break;
          }
          case Coins.REP: {
            token = TOKENS.AUGUR;
            break;
          }
          case Coins.SALT: {
            token = TOKENS.SALT;
            break;
          }
          case Coins.GNT: {
            token = TOKENS.GOLEM;
            break;
          }
          case Coins.EOS: {
            token = TOKENS.EOS;
            break;
          }
          case Coins.CVC: {
            token = TOKENS.CIVIC;
            break;
          }
          case Coins.DNT: {
            token = TOKENS.DISTRICT0X;
            break;
          }
          case Coins.SNT: {
            token = TOKENS.STATUSNETWORK;
            break;
          }
        }

        const ethCoinModel = new EthTokenWallet(token);
        const xprivKey = AltcoinioStorage.get("btcprivkey");
        const keystore = ethCoinModel.recover(xprivKey);
        ethCoinModel.login(keystore, xprivKey);
        return ethCoinModel;
      }
      default: {
        // TODO: Fix
        const ethCoinModel = new EthTokenWallet(TOKENS.AUGUR);
        const xprivKey = AltcoinioStorage.get("btcprivkey");
        const keystore = ethCoinModel.recover(xprivKey);
        ethCoinModel.login(keystore, xprivKey);
        return ethCoinModel;
      }
    }
  }
}
