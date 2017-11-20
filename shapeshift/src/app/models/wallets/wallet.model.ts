export abstract class WalletModel {
  protected privKey: string;
  protected xprivKey: string;

  abstract get newAddress();

  abstract balance();

  abstract get privateKey();
}
