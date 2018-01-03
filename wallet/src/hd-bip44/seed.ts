import * as bip39 from "bip39";

export const generateMnemonic = () => {
  return bip39.generateMnemonic();
};
const EXTERNAL_CHAIN = 0;
const INTERNAL_CHAIN = 1;

export abstract class Bip44Wallet<T> {
  protected abstract coin;
  private root;
  private account = 0; // probably we will never change this
  private interalAddressIndex = 0;
  private externalAddressIndex = 0;

  constructor(mnemonic?: string) {
    if (!mnemonic) {
      mnemonic = generateMnemonic();
    }
    const seed = bip39.mnemonicToSeed(mnemonic);
    // this.root = HDNode.fromSeedBuffer(seed);
  }
  //
  // public generateNextInternal(): HDNode {
  //   const child = this.root
  //     .derivePath(`m/44'/${this.coin}'/${this.account}'/${INTERNAL_CHAIN}/${this.interalAddressIndex++}`);
  //   return child;
  // }
  //
  // public generateNextExternal(): HDNode {
  //   const child = this.root
  //     .derivePath(`m/44'/${this.coin}'/${this.account}'/${EXTERNAL_CHAIN}/${this.externalAddressIndex++}`);
  //   return child;
  // }
}

export class BitcoinBip44Wallet extends Bip44Wallet<BitcoinBip44Wallet> {
  protected coin = 0;

}

export class EthBip44Wallet extends Bip44Wallet<EthBip44Wallet> {
  protected coin = 60;

}
