// import {BtcRefundData} from "./btc-refund-data";
//
// export class BtcAtomicSwapContractData extends BtcRefundData {
//     public contract: any;
//     public contractP2SH: any;
//     public contractP2SHPkScript: any;
//     public contractTxHash: any;
//     public contractTx: any;
//     public contractFee: any;
//     constructor(contract: any, contractP2SH: any, contractP2SHPkScript: any, contractTxHash: any,
//                 contractTx: any, contractFee: any, refundFee: any, refundTx: any) {
//         super(refundFee, refundTx);
//         this.contract = contract;
//         this.contractP2SH = contractP2SH;
//         this.contractP2SHPkScript = contractP2SHPkScript;
//         this.contractTxHash = contractTxHash;
//         this.contractTx = contractTx;
//         this.contractFee = contractFee;
//     }
// }
//
// export class BtcAtomicSwapData {
//   constructor(public secretHash: any, public recipientHash: any, public  lockTime: any, public refundHash160: any) {
//
//   }
// }
//
// import {ExtractSecretData} from "../../atomic-swap";
//
// export class BtcExtractSecretData extends ExtractSecretData {
//
// }
//
// import {RedeemData} from "../../atomic-swap";
//
// export class BtcRedeemData extends RedeemData {
//     public redeemTx: string;
//     public rawTx: any;
//     constructor(redeemTx: string, rawTx: any) {
//         super();
//         this.redeemTx = redeemTx;
//         this.rawTx = rawTx;
//     }
// }
//
//
// export class BtcAuditContractData {
//     public contractSH: any;
//     public contractValue: any;
//     public recipientAddress: string;
//     public refundAddress: string;
//     public secretHash: any;
//     public lockTime: Date;
//
//     constructor(contractSH: any, contractValue: any, recipientAddress: string,
//                 refundAddress: string, secretHash: any, lockTime: Date) {
//         this.contractSH = contractSH;
//         this.contractValue = contractValue;
//         this.recipientAddress = recipientAddress;
//         this.refundAddress = refundAddress;
//         this.secretHash = secretHash;
//         this.lockTime = lockTime;
//     }
// }
//
// import {BtcInitiateData} from "./btc-initiate-data";
//
// export class BtcParticipateData extends BtcInitiateData {
//
// }
//
// import {InitiateData} from "../../atomic-swap";
//
// export class BtcInitiateData extends InitiateData {
//     public fee: any;
//     public contract: string;
//     public contractHex: any;
//     public contractTx: any;
//     public contractTxHex: string;
//     public rawTx: any;
//     constructor(fee: any, contract: any, contractHex: string,
//                 contractTx: any, contractTxHex: string, rawTx: any, secret?: string, secretHash?: string) {
//         super(secret, secretHash);
//         this.fee = fee;
//         this.contract = contract;
//         this.contractHex = contractHex;
//         this.contractTx = contractTx;
//         this.contractTxHex = contractTxHex;
//         this.rawTx = rawTx;
//     }
// }
//
// import {BtcInitiateData} from "./btc-initiate-data";
//
// export class BtcParticipateData extends BtcInitiateData {
//
// }
//
// import {RefundData} from "../../atomic-swap";
//
// export class BtcRefundData extends RefundData {
//     constructor(public refundFee: any, public refundTx: any) {
//         super();
//     }
// }
