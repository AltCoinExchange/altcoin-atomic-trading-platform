const axios = require('axios');
const UnspentOutput = require('bitcore').Transaction.UnspentOutput;
const RpcClient = require('bitcoind-rpc');

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
   * Publish tx
   * @returns {Promise<any>}
   */
  public async publishTx(tx: any) {
      return new Promise(function(resolve, reject) {
        this.rpc.sendRawTransaction(tx, (a, b) => {
          console.log(b);
          resolve(b.result);
        });
      });
    };

    /**
     * Get raw change address
     * @returns {Promise<null>}
     */
    public async getRawChangeAddress() {
        const data = {
            'method': 'getrawchangeaddress',
            'rpcuser': this.configuration.user,
            'rpcpassword': this.configuration.pass,
        };
        try {
            const response = await axios.post(
                this.configuration.url,
                data,
                {
                    auth: {
                        username: this.configuration.user,
                        password: this.configuration.pass,
                    },
                },
            );
            return response.data.result;
        } catch (err) {
            console.log('err', err);
            return null;
        }
    };

    /**
     *
     * @param tx
     * @param feePerKb
     * @returns fundedTransaction, fee
     */
    public async fundRawTransaction(tx, feePerKb) {
        try {
            return await axios.post(
                this.configuration.url,
                {
                    'rpcuser': this.configuration.user,
                    'rpcpassword': this.configuration.pass,
                    'method': 'fundrawtransaction',
                    'params': [
                        tx,
                        {'feeRate': feePerKb},
                    ],
                },
                {
                    auth: {
                        username: this.configuration.user,
                        password: this.configuration.pass,
                    },
                },
            );
        } catch (err) {
            throw new Error(err);
        }
    };

    /**
     * Estimate fee
     * @returns {Promise<any>}
     */
    public async estimateFee() {
        return await axios.post(
            this.configuration.url,
            {
                'rpcuser': this.configuration.user,
                'rpcpassword': this.configuration.pass,
                'method': 'estimatesmartfee',
                'params': [6],
            },
            {
                auth: {
                    username: this.configuration.user,
                    password: this.configuration.pass,
                },
            },
        );
    };

    /**
     * Get unspent outputs
     * @param addr
     * @returns {Promise<any>}
     */
    public async getUnspentOutputs(addr) {
        // const urlQuery = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr + "?unspentOnly=true&includeScript=true"
        // const txrefs = res.data.txrefs
        // const unconfirmed_txrefs = res.data.unconfirmed_txrefs

        const numOfConfirmations = 1;
        const urlQuery = 'https://chain.so/api/v2/get_tx_unspent/BTCTEST/' + addr + '/' + numOfConfirmations;
        const res = await axios.get(urlQuery);

        const unspentOutputs = res.data.data.txs;
        // console.log(urlQuery);
        return unspentOutputs;
    };

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
                'txId': output.txid,
                'outputIndex': output.output_no,
                'address': addr,
                'script': output.script_hex,
                'satoshis': value,
            });
            // HINT: utxo can be a instance of UnspentOutput or a object with the necessery parametars
            tx.from(utxo);
            if (tx._getOutputAmount() < tx._getInputAmount()) {
                break;
            }
        }

        if (tx._getOutputAmount() > tx._getInputAmount()) {
            throw new Error('insufficent funds');
        }

        // TODO: feejevi
        // console.log("**tx.getFee() ", tx.getFee());

        tx.change(addr);

        return tx;
    };
}
