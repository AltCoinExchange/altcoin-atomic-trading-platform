import * as bitcore from "bitcore";
import * as Mnemonic from "bitcore-mnemonic";
import {BtcAtomicSwap} from "./btc-atomic-swap";
import {FreshBitcoinWallet} from "./fresh-btc";
import {RegenerateBitcoinWallet} from "./regenerate-btc";

const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BtcWallet extends BtcAtomicSwap {
  public code: any;
  public hierarchicalPrivateKey: any;
  public btcConfiguration: any;
  public btcRpcConfiguration: any;

  constructor(btcConfiguration, btcRpcConfiguration) {
    super(btcRpcConfiguration);
    this.btcConfiguration = btcConfiguration;
    this.btcRpcConfiguration = btcRpcConfiguration;
  }

  get hdPrivateKey(): any {
    return this.hierarchicalPrivateKey;
  }

  public get WIF(): string {
    return this.hierarchicalPrivateKey.privateKey.toWIF();
  }

  public recover(params: RegenerateBitcoinWallet) {
    this.hierarchicalPrivateKey = new HDPrivateKey(params.code);
  }

  public create(params: FreshBitcoinWallet) {
    const valid = Mnemonic.isValid(params.code);
    if (!valid) {
      throw Error("Not valid mnemonic code");
    }

    this.code = new Mnemonic(params.code);
    this.generateHDPrivateKey(params.password);
  }

  public generateAddressFromWif(wif?: string): string {
    if (!wif) {
      wif = this.WIF;
    }
    const WIF = new PrivateKey(wif);
    return WIF.toPublicKey().toAddress(this.btcConfiguration.network).toString();
  }

  private generateHDPrivateKey(passPhrase): void {
    this.hierarchicalPrivateKey = this.code.toHDPrivateKey(passPhrase, this.btcRpcConfiguration.network);
  }
}
