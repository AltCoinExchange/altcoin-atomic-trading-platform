// export interface WalletModel {}
export abstract class WalletModel {
  protected privKey: string;
  protected xprivKey: string;

  abstract privateKey();
  abstract redeem(data);
  abstract refund(hashedSecret: string, amount: number);
  abstract refund(contract: string, contractTx: string): any;
  abstract extractSecret(hashedSecret: string): any;
  abstract getBalance(address: string);
  abstract getBalance(address: string): any;
  abstract initiate(address: string, amount: number): any;
  abstract participate(address: string, secretHash: string, amount: number): any;
  abstract generateNewAddress();
}
