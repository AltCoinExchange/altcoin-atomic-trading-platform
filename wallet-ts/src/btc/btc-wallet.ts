import * as bitcore from "bitcore";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";
import {FreshBitcoinWallet} from "./fresh-btc";
import * as Mnemonic from "bitcore-mnemonic";
import {RegenerateBitcoinWallet} from "./regenerate-btc";

const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BtcWallet {
  private code: any;
  private hierarchicalPrivateKey: any;

  constructor(params: RegenerateBitcoinWallet);
  constructor(params: FreshBitcoinWallet) {
    if (params instanceof RegenerateBitcoinWallet) {
      this.hierarchicalPrivateKey = new HDPrivateKey(params.code);
    } else if (params instanceof FreshBitcoinWallet) {
      const valid = Mnemonic.isValid(params.code);
      if (!valid) {
        throw Error("Not valid mnemonic code");
      }

      this.code = new Mnemonic(params.code);
      this.generateHDPrivateKey(params.password);
    } else {
      throw new Error("Please pass RegenerateBitcoinWallet|FreshBitcoinWallet instance to constructor.");
    }
  }

  get hdPrivateKey(): any {
    return this.hierarchicalPrivateKey;
  }

  public get WIF(): string {
    return this.hierarchicalPrivateKey.privateKey.toWIF();
  }

  public generateAddressFromWif(wif?: string): string {
    if (!wif) {
      wif = this.WIF;
    }
    const WIF = new PrivateKey(wif);
    return WIF.toPublicKey().toAddress(BtcConfiguration.network).toString();
  }

  private generateHDPrivateKey(passPhrase): void {
    this.hierarchicalPrivateKey = this.code.toHDPrivateKey(passPhrase, BtcRpcConfiguration.network);
  }
}
