const axios = require("axios");
const UnspentOutput = require("bitcore").Transaction.UnspentOutput;
const RpcClient = require("bitcoind-rpc");

// const url =
//     configuration.protocol + '://' +
//     configuration.user + ':' +
//     configuration.pass + '@' +
//     configuration.host + ':' +
//     configuration.port;

export class BtcTransaction {
    configuration: any;
    rpc: any;

    constructor(configuration) {
        this.configuration = configuration;
        this.rpc = new RpcClient(configuration);
    }

    /**
     * Call RPC generic procedure with parameters
     * @param {string} method
     * @param {any[]} params
     * @returns {Promise<any>}
     */
    public async callRPCProc(method: string, params: any[]) {
        return await axios.post(
          this.configuration.url,
          {
              "rpcuser": this.configuration.user,
              "rpcpassword": this.configuration.pass,
              "method": method,
              "params": params,
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
        return new Promise(function (resolve, reject) {
            this.rpc.sendRawTransaction(tx, (a, b) => {
                console.log(b);
                resolve(b.result);
            });
        });
    }

    /**
     * Get raw change address
     * @returns {Promise<null>}
     */
    public async getRawChangeAddress() {
        return await this.callRPCProc('getrawchangeaddress', []);
    }

    /**
     *
     * @param tx
     * @param feePerKb
     * @returns fundedTransaction, fee
     */
    public async fundRawTransaction(tx, feePerKb) {
        return await this.callRPCProc('getrawchangeaddress', [
            tx,
            { "feeRate": feePerKb }
        ]);
    }

    /**
     * Estimate fee
     * @returns {Promise<any>}
     */
    public async estimateFee() {
        return await this.callRPCProc('estimatesmartfee', [6]);
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
                "txId": output.txid,
                "outputIndex": output.output_no,
                "address": addr,
                "script": output.script_hex,
                "satoshis": value,
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
        const estimateRawResp = await this.callRPCProc('estimatesmartfee', [6]);
        return estimateRawResp.data.result.feerate;
    }
}
