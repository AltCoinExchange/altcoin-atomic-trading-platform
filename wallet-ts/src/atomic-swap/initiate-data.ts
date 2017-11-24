export abstract class InitiateData {
  public secretHash: string;
  public secret: string;
  constructor(secret: string, secretHash: string) {
    this.secret = secret;
    this.secretHash = secretHash;
  }
}
