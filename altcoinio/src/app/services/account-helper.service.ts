import {Injectable} from "@angular/core";
import {RegenerateBitcoinWallet} from "altcoinio-wallet";
import {AltcoinioStorage} from "../common/altcoinio-storage";
import * as walletAction from "../actions/wallet.action";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers/app.state";
import {EthWallet} from "../models/wallets/eth-wallet";
import {BtcWallet} from "../models/wallets/btc-wallet";

@Injectable()
export class AccountHelperService {
  ethInstance;
  ethWallet;
  btcInstance;
  btcWallet;

  lastRequest = new Date().getTime();

  firstTime = false;

  constructor(private store: Store<AppState>) {

  }

  public generateWalletsFromPrivKey() {
    if (this.ethInstance && this.ethInstance.isWebSocketAlive()) {
      return {
        ethInstance: this.ethInstance,
        ethWallet: this.ethWallet,
        btcInstance: this.btcInstance,
        btcWallet: this.btcWallet,
      };
    }
    const {btcWallet, btcInstance} = this.generateBtcWallet();
    const {ethInstance, ethWallet} = this.generateEthWallet(btcWallet.xprivkey);
    this.store.dispatch(new walletAction.SetEthWalletAction(ethWallet));
    this.ethInstance = ethInstance;
    this.ethWallet = ethWallet;
    this.btcWallet = btcWallet;
    this.btcInstance = btcInstance;


    return {
      ethInstance: this.ethInstance,
      ethWallet: this.ethWallet,
      btcInstance: this.btcInstance,
      btcWallet: this.btcWallet,
    };
  }

  private generateBtcWallet() {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const btc = new BtcWallet();
    const wallet = new RegenerateBitcoinWallet(xprivKey);
    btc.recover(wallet);
    const WIF = btc.WIF;
    const address = btc.generateAddressFromWif(WIF);
    const xkey = btc.hdPrivateKey.xprivkey;
    const btcWallet = {
      xprivkey: xkey,
      WIF,
      address
    };
    this.store.dispatch(new walletAction.SetBtcWalletAction(btcWallet));
    return {btcWallet, btcInstance: btc};
  }

  private generateEthWallet(xprivKey) {
    const eth = new EthWallet();

    const recovered = eth.recover(xprivKey);
    eth.login(recovered);

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
