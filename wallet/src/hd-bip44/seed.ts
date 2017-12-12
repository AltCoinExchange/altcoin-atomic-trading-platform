import * as bip39 from "bip39";

export const generateMnemonic = () => {
  return bip39.generateMnemonic();
};

export class Seed {
  constructor(mnemonic?: string) {
    if (!mnemonic) {
      mnemonic = generateMnemonic();
    }
    this._seed = bip39.mnemonicToSeed(mnemonic);
  }

  private _seed: any; // tslint:disable-line

  get seed(): any {
    return this._seed;
  }
}
