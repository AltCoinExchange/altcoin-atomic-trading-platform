import {BitcoinWallet, EthereumWallet, RegenerateBitcoinWallet} from "altcoinio-wallet";
import * as walletAction from "../actions/wallet.action";
import {ShapeshiftStorage} from "./shapeshift-storage";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/app.state";

export class AccountHelper {
  public static generateWalletsFromPrivKey(store: Store<AppState>) {
    const btcWallet = this.generateBtcWallet(store);
    this.generateEthWallet(btcWallet.xprivkey, store);
  }

  private static generateBtcWallet(store: Store<AppState>) {
    const xprivKey = ShapeshiftStorage.get('btcprivkey');
    const btc = new BitcoinWallet();
    const wallet = new RegenerateBitcoinWallet(xprivKey);
    btc.recover(wallet);
    const WIF = btc.WIF;
    const address = btc.generateAddressFromWif(WIF);
    const xkey = btc.hdPrivateKey.xprivkey;
    store.dispatch(new walletAction.SetBtcWalletAction({
      xprivkey: xkey,
      WIF,
      address
    }));
    return {
      xprivkey: xkey,
      WIF
    };
  }

  private static generateEthWallet(xprivKey, store: Store<AppState>) {
    const eth = new EthereumWallet();

    const recovered = eth.recover(xprivKey);
    eth.login(recovered, xprivKey);
    const ethWallet = {
      privateKey: xprivKey,
      keystore: recovered,
      address: recovered.address
    };

    store.dispatch(new walletAction.SetEthWalletAction(ethWallet));
  }
}
