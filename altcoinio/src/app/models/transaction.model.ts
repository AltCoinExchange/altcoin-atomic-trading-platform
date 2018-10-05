export interface TransactionModel {
  from: Array<TransactionDetailsModel>;
  to: Array<TransactionDetailsModel>;
}

export interface TransactionDetailsModel {
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: number;
  r: string;
  s: string;
  v: string;
  transactionIndex: number;
}
