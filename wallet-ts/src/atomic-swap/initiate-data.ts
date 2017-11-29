export abstract class InitiateData {
  constructor(public secret: string,
              public secretHash: string) {
  }

  public get participateData() {
    return this.secretHash;
  }
}
