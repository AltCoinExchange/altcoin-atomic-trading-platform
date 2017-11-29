export abstract class InitiateData {
  public address: string;
  constructor(public secret: string,
              public secretHash: string) {
  }

  public get participateData() {
    return this.secretHash;
  }
}
