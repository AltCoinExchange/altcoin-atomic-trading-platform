export class RegenerateBitcoinWallet {

  constructor(public btcConfiguration, public btcRpcConfiguration, public readonly code: string, public readonly password?: string) {

  }
}
