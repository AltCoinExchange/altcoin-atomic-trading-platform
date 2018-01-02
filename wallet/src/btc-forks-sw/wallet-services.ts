import axios, {AxiosResponse} from "axios";
import * as RpcClient from "bitcoind-rpc";
import * as bitcore from "bitcore";
import {BtcRefundData} from "./atomic-swap";
import {BtcAtomicSwapContractData} from "./atomic-swap/btc-atomic-swap-contract-data";
import {BtcContractBuilder} from "./btc-contract-builder";
import {Util} from "./util";

const UnspentOutput = bitcore.Transaction.UnspentOutput;
const PrivateKey = bitcore.PrivateKey;
const Transaction = bitcore.Transaction;
const Address = bitcore.Address;
const Script = bitcore.Script;
const BufferReader = bitcore.encoding.BufferReader;

export class BtcTransaction {
  protected configuration: any;
  private rpc: any;

  constructor(btcConfiguration, btcRpcConfiguration) {
    this.configuration = btcRpcConfiguration;
    this.rpc = new RpcClient(btcRpcConfiguration);
  }

  /**
   * Call RPC generic procedure with parameters
   * @param {string} method
   * @param {any[]} params
   * @returns {Promise<any>}
   */
  public async callRPCProc(method: string, params: any[]): Promise<AxiosResponse> {
    const url =
      this.configuration.protocol + "://" +
      this.configuration.user + ":" +
      this.configuration.pass + "@" +
      this.configuration.host + ":" +
      this.configuration.port;
    return await axios.post(
      url,
      {
        rpcuser: this.configuration.user,
        rpcpassword: this.configuration.pass,
        method,
        params,
      },
      {
        auth: {
          username: this.configuration.user,
          password: this.configuration.pass,
        },
      },
    );
  }

  /**
   * Publish tx
   * @returns {Promise<any>}
   */
  public async publishTx(tx: any) {
    return new Promise((resolve, reject) => {
      this.rpc.sendRawTransaction(tx, (a, b) => {
        resolve(b.result);
      });
    });
  }

  /**
   * Get raw change address
   * @returns {Promise<null>}
   */
  public async getRawChangeAddress() {
    return await this.callRPCProc("getrawchangeaddress", []);
  }

  /**
   *
   * @param tx
   * @param feePerKb
   * @returns fundedTransaction, fee
   */
  public async fundRawTransaction(tx, feePerKb) {
    return await this.callRPCProc("getrawchangeaddress", [
      tx,
      {feeRate: feePerKb},
    ]);
  }

  /**
   * Estimate fee
   * @returns {Promise<any>}
   */
  public async estimateFee() {
    return await this.callRPCProc("estimatesmartfee", [6]);
  }

  /**
   * Get unspent outputs
   * @param addr
   * @returns {Promise<any>}
   */
  public async getUnspentOutputs(addr) {
    const numOfConfirmations = 1;
    const urlQuery = "https://chain.so/api/v2/get_tx_unspent/BTCTEST/" + addr + "/" + numOfConfirmations;
    const res = await axios.get(urlQuery);
    // console.log(urlQuery);
    return res.data.data.txs;
  }

  /**
   * Fund transaction
   * @param {string} addr
   * @param tx
   * @returns {Promise<any>}
   */
  public async fundTransaction(addr: string, tx: any) {
    const unspentOutputs = await this.getUnspentOutputs(addr.toString());
    for (const output of unspentOutputs) {

      // BLOCKCYPHER
      // let utxo = new UnspentOutput({
      //   "txId" : output.tx_hash,
      //   "outputIndex" : output.tx_output_n,
      //   "address" : addr,
      //   "script" : output.script,
      //   "satoshis" : output.value
      // });
      const value = Math.round(output.value * 100000000);

      // console.log(output.value * 100000000);
      // console.log(value);
      // CHAIN.SO
      const utxo = new UnspentOutput({
        txId: output.txid,
        outputIndex: output.output_no,
        address: addr,
        script: output.script_hex,
        satoshis: value,
      });
      // HINT: utxo can be a instance of UnspentOutput or a object with the necessery parametars
      tx.from(utxo);
      if (tx._getOutputAmount() < tx._getInputAmount()) {
        break;
      }
    }

    if (tx._getOutputAmount() > tx._getInputAmount()) {
      throw new Error("insufficent funds");
    }

    // TODO: feejevi
    // console.log("**tx.getFee() ", tx.getFee());

    tx.change(addr);

    return tx;
  }

  /**
   * Get
   * @returns {Promise<any>}
   */
  public async getChangeAddress() {
    const refundAddr = await this.getRawChangeAddress();
    // const addressHex = new Buffer(refundAddr, 'hex');
    return refundAddr;
  }

  /**
   * Get fee per Kb
   * @returns {Promise<any>}
   */
  public async getFeePerKb() {
    const estimateRawResp = await this.callRPCProc("estimatesmartfee", [6]);
    // If error then try to get form other sources
    if (estimateRawResp.data.result.errors) {
      return this.calculateFee();
      // return this.getFeeFromBlockCypher();
      // throw new Error("getFeePerKb: " + estimateRawResp.data.result.errors.toString());
    } else {
      return estimateRawResp.data.result.feerate;
    }
  }

  private async calculateFee() {
    const estimateRawResp = await this.callRPCProc("estimaterawfee", [6]);
    const res = estimateRawResp.data.result;
    if (res.medium.fail.startrange !== 0) {
      return res.medium.fail.startrange;
    } else if (res.long.fail.startrange !== 0) {
      return res.long.fail.startrange;
    } else {
      return res.short.fail.startrange;
    }

  }

  private async getFeeFromBlockCypher() {
    const res = await axios.get("https://api.blockcypher.com/v1/btc/test3");
    return res.data.result.medium_fee_per_kb;
  }
}
