export interface IEthAccount {
  wallet: {
    address: string,
    privateKey: string,
    singTransaction: () => any,
    sign: () => any,
    encrypt: () => any,
  };
  keystore: {
    version: number,
    id: string,
    address: string,
    crypto: {
      ciphertext: string,
      cipherparams: any,
      cipher: string,
      kdf: string,
      kdfparams: any,
      mac: string,
    };
  };
}
