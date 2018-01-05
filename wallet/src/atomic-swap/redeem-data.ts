export class RedeemData {
  constructor(public secret: string,
              public secretHash: string,
              public contractBin?,
              public contractTx?) {
  }
}
