import * as bitcore from "bitcore";
import * as Mnemonic from 'bitcore-mnemonic';
import {BtcRpcConfiguration} from "./config/config";
import {BtcConfiguration} from "./config/config-btc";

const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BtcWallet {
  private code: any;

  constructor(params: RegenerateBitcoinWallet);

  constructor(params: FreshBitcoinWallet) {
    if (params instanceof RegenerateBitcoinWallet) {
      this._hdPrivateKey = new HDPrivateKey(params.code);
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

  private _hdPrivateKey: any;

  get hdPrivateKey(): any {
    return this._hdPrivateKey;
  }

  generateAddressFromWif(wif?: string): string {
    if (!wif) {
      wif = this.WIF;
    }
    const WIF = new PrivateKey(wif);
    return WIF.toPublicKey().toAddress(BtcConfiguration.network).toString();
  }

  public get WIF(): string {
    return this.hdPrivateKey.privateKey.toWIF();
  }

  private generateHDPrivateKey(passPhrase): void {
    this._hdPrivateKey = this.code.toHDPrivateKey(passPhrase, BtcRpcConfiguration.network);
  }
}

export class RegenerateBitcoinWallet {

  constructor(public readonly code: string, public readonly password?: string) {

  }
}

export class FreshBitcoinWallet {

  constructor(public readonly code: string, public readonly password?: string) {

  }
}
