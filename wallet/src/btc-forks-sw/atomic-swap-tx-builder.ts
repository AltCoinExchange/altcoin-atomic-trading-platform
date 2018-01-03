import {IAtomicSwap} from "../atomic-swap";
// tslint:disable
// import * as bitcore from "bitcore";
// import * as Hashing from "../common/hashing";
// import {SecretGenerator, SecretResult} from "../common/hashing";
// import {
//   BtcExtractSecretData,
//   BtcExtractSecretParams,
//   BtcInitiateData,
//   BtcInitiateParams,
//   BtcParticipateData,
//   BtcParticipateParams,
//   BtcRedeemData,
//   BtcRedeemParams,
//   BtcRefundData,
//   BtcRefundParams,
// } from "./atomic-swap";
// import {BtcAuditContractData} from "./atomic-swap/btc-audit-contract-data";
// import {BtcContractBuilder} from "./btc-contract-builder";
// import {BtcTransaction} from "./btc-transaction";
// import {Util} from "./util";
//
// const Transaction = bitcore.Transaction;
// const Address = bitcore.Address;
// const PrivateKey = bitcore.PrivateKey;
// const Script = bitcore.Script;
// const Buffer = bitcore.Buffer;

export class AtomicSwapTxBuilder {
    // implements IAtomicSwap {
  //
  // constructor(btcConfiguration, btcRpcConfiguration) {
  //   super(btcConfiguration, btcRpcConfiguration);
  //   this.configuration = btcRpcConfiguration;
  // }
  //
  // public async initiate(params: BtcInitiateParams): Promise<BtcInitiateData> {
  //
  //   // return new BtcInitiateData(b.contractFee, b.contractP2SH.toString(), b.contract.toHex(), b.contractTx.hash,
  //   //   b.contractTx.toString(), rawTx, secret.secret, secret.secretHash);
  // }
  //
  // public async participate(params: BtcParticipateParams): Promise<BtcParticipateData> {
  //
  //
  //   // return new BtcParticipateData(b.contractFee, b.contractP2SH.toString(),
  //   //   b.contract.toHex(), b.contractTx.hash, b.contractTx.toString(), rawTx);
  // }
  //
  // public async redeem(params: BtcRedeemParams): Promise<BtcRedeemData> {
  //
  //   // return new BtcRedeemData(params.secret, params.hashedSecret, redeemTx.toString(), res);
  // }
  //
  //
  // public refund(refundParams: BtcRefundParams): Promise<BtcRefundData> {
  //   return undefined;
  // }
  //
  //
  // public async auditContract(ct, tx) {
  //
  //   // return new BtcAuditContractData(contractSH, contractValue, recipientAddress.toString(),
  //   //   refundAddress.toString(), pushes.secretHash.replace("0x", ""), new Date(pushes.lockTime * 1000));
  // }

  // public async extractSecret(extractSecretParams: BtcExtractSecretParams): Promise<BtcExtractSecretData> {
  //   const transaction = new Transaction(extractSecretParams.redemptionTx);
  //   const txData = Util.flatMap(
  //     transaction.toJSON().inputs.map((input) => {
  //       const script = new Script(input.scriptString);
  //       const pops = script.toString().split(" ");
  //       const data = pops.filter((opcode) => opcode.indexOf("0x") !== -1)
  //         .map((opdata) => opdata.replace("0x", ""));
  //       return data;
  //     }),
  //   );
  //   const secret = txData.find((sc) => {
  //     return new Hashing.Ripemd160().buffer(Buffer.from(sc, "hex")) === extractSecretParams.hashedSecret;
  //   });
  //   return secret;
  // }

}
