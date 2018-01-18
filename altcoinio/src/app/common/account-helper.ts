import {BitcoinWallet, RegenerateBitcoinWallet} from "altcoinio-wallet";
import * as walletAction from "../actions/wallet.action";
import {AltcoinioStorage} from "./altcoinio-storage";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/app.state";
import {EthWallet} from "../models/wallets/eth-wallet";

export class AccountHelper {
  public static generateWalletsFromPrivKey(store: Store<AppState>) {
    const btcWallet = this.generateBtcWallet(store);
    const {ethInstance, ethWallet} = this.generateEthWallet(btcWallet.xprivkey);
    store.dispatch(new walletAction.SetEthWalletAction(ethWallet));

    return {
      ethInstance,
      ethWallet
    };
  }

  private static generateBtcWallet(store: Store<AppState>) {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
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

  private static generateEthWallet(xprivKey) {
    const eth = new EthWallet();

    const recovered = eth.recover(xprivKey);
    eth.login(recovered, xprivKey);

    const ethWallet = {
      privateKey: xprivKey,
      keystore: recovered,
      address: recovered.address
    };

    return {
      ethInstance: eth,
      ethWallet
    };
  }
}
