import axios, {AxiosResponse} from "axios";
import * as RpcClient from "bitcoind-rpc";
import * as bitcore from "bitcore";
import {BtcRefundData} from "./atomic-swap";
import {BtcAtomicSwapContractData} from "./atomic-swap/btc-atomic-swap-contract-data";
import {BtcContractBuilder} from "./btc-contract-builder";
import {Util} from "./util";
import {BtcRpcConfiguration} from "../config/config";

const UnspentOutput = bitcore.Transaction.UnspentOutput;
const PrivateKey = bitcore.PrivateKey;
const Transaction = bitcore.Transaction;
const Address = bitcore.Address;
const Script = bitcore.Script;
const BufferReader = bitcore.encoding.BufferReader;

export class BtcTransaction {
    protected configuration: any;
    private rpc: any;

    constructor(net) {
        if (net === "testnet") {
            this.configuration = BtcRpcConfiguration;
            this.rpc = new RpcClient(BtcRpcConfiguration);
        } else if (net === "mainnet") {
            // TODO
        }
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
     * Build contract
     * @param them
     * @param amount
     * @param lockTime
     * @param secretHash
     * @param privateKey
     * @returns {any}
     */
    public async buildContract(them, amount, lockTime, secretHash, privateKey) {
        const PK = PrivateKey.fromWIF(privateKey);
        const refundAddr = PK.toPublicKey().toAddress(this.configuration.network);

        const themAddr = new Address(them);

        const contract = BtcContractBuilder.atomicSwapContract(
            refundAddr.toJSON().hash,
            themAddr.toJSON().hash,
            lockTime,
            secretHash,
        );

        const contractP2SH = Util.NewAddressScriptHash(contract.toHex(), this.configuration.network);
        const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);

        const contractTx = new Transaction();
        const value = Math.round(amount * 100000000);
        // console.log(value);
        const output = Transaction.Output({
            script: contractP2SHPkScript,
            satoshis: value,
        });
        contractTx.addOutput(output);

        // const transaction: BtcTransaction = new BtcTransaction(this.configuration);
        await this.fundTransaction(refundAddr, contractTx);

        // SIGN TRANSACTION
        const signatures = contractTx.getSignatures(privateKey);
        for (const signature of signatures) {
            contractTx.applySignature(signature);
        }

        const contractTxHash = contractTx.hash;
        const contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();

        const refundData: BtcRefundData = await this.buildRefund(contract.toHex(), contractTx.toString(), privateKey);

        return new BtcAtomicSwapContractData(contract, contractP2SH, contractP2SHPkScript,
            contractTxHash, contractTx, contractFee, refundData.refundFee, refundData.refundTx);
    }

    /**
     * Build refund
     * @param strCt
     * @param strCtTx
     * @param privateKey
     * @returns {Promise<BtcRefundData>}
     */
    public async buildRefund(strCt, strCtTx, privateKey): Promise<BtcRefundData> {
        // TODO: change strCt, strCtTx to ct, ctTx
        const contract = new Script(strCt);
        const pushes = BtcContractBuilder.extractAtomicSwapContract(strCt);

        if (!pushes) {
            throw new Error("contract is not an atomic swap script recognized by this tool");
        }

        const ctTx = new Transaction(strCtTx);

        const refundAddrString = pushes.refundHash160.replace("0x", "");
        const refundAddress = Util.NewAddressPubKeyHash(refundAddrString, "testnet");
        const contractP2SH = Util.NewAddressScriptHash(strCt, this.configuration.network);

        let ctTxOutIdx = -1;

        for (let i = 0; i < ctTx.outputs.length; i++) {
            const scr = new Script(ctTx.outputs[i].script);
            const address = scr.toAddress(this.configuration.network);
            const addressHash = address.toJSON().hash;

            if (addressHash === contractP2SH.toJSON().hash) {
                ctTxOutIdx = i;
                break;
            }
        }

        if (ctTxOutIdx === -1) {
            throw new Error("transaction does not contain a contract output");
        }

        const addAxiosResponse = await this.getChangeAddress();
        // tslint:disable-next-line
        console.log("addr initiation", addAxiosResponse);
        const addr = new Address(addAxiosResponse.data.result);
        // tslint:disable-next-line
        console.log("addr initiation");
        // const addr = 'mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ';
        const outScript = Script.buildPublicKeyHashOut(addr);
        // tslint:disable-next-line
        console.log("0 initiation");
        // https://bitcoin.org/en/developer-examples#offline-signing
        const refundTx = new Transaction();
        const lockTime = new BufferReader(pushes.lockTime).readUInt32LE();
        refundTx.lockUntilDate(lockTime);
        // tslint:disable-next-line
        console.log("1 initiation");
        // TODO: "refund output value of %v is dust"
        let output = Transaction.Output({
            script: outScript,
            satoshis: 0,
        });

        refundTx.addOutput(output);
        const feePerKb = await this.getFeePerKb(); // Does not retrieve fee per kb
        const redeemSerializeSize = Util.EstimateRefundSerializeSize(contract, refundTx.outputs);
        const refundFee = Util.FeeForSerializeSize(feePerKb, redeemSerializeSize) * 100000000;

        const amount = ctTx.outputs[ctTxOutIdx].satoshis - refundFee;
        if (amount && amount < 0) {
            throw new Error("Transaction amount is too small!");
        }
        // tslint:disable-next-line
        console.log("2 initiation", amount, ctTx.outputs[ctTxOutIdx].satoshis, refundFee);
        output = Transaction.Output({
            script: outScript,
            satoshis: Math.round(amount),
        });

        refundTx.removeOutput(0);
        refundTx.addOutput(output);

        const input = Transaction.Input({
            prevTxId: ctTx.id,
            outputIndex: ctTxOutIdx,
            sequenceNumber: 0,
            script: new Script(ctTx.outputs[ctTxOutIdx].script),
        });
        // tslint:disable-next-line
        console.log("3 initiation");
        refundTx.uncheckedAddInput(input);

        const inputIndex = 0;
        const {sig, pubKey} = await BtcContractBuilder
            .createSig(refundTx, inputIndex, contract, refundAddress, privateKey);
        // tslint:disable-next-line
        console.log("4 initiation");
        // TODO: Check
        const script = BtcContractBuilder
            .refundP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), "");

        refundTx.inputs[0].setScript(script);

        return new BtcRefundData(refundFee, refundTx);
    }

    /**
     * Publish tx
     * @returns {Promise<any>}
     */
    public async publishTx(tx: any) {
        return new Promise((resolve, reject) => {
            this.rpc.sendRawTransaction(tx, (a, b) => {
                if (a) {
                    console.log("ERROR PUBLISHING TRANSACTION: ", a); // tslint:disable-line
                    reject(new Error(JSON.stringify(a)));
                } else {
                    resolve(b.result);
                }
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

        return 450 * 1000 / 100000000;
        // const estimateRawResp = await this.callRPCProc("estimatesmartfee", [6]);
        // // If error then try to get form other sources
        // if (estimateRawResp.data.result.errors) {
        //   return await this.calculateFee();
        //   // return this.getFeeFromBlockCypher();
        //   // throw new Error("getFeePerKb: " + estimateRawResp.data.result.errors.toString());
        // } else {
        //   return estimateRawResp.data.result.feerate;
        // }
    }

    /**
     * Get raw change address
     * Unfortunately this is not working normal so far therefore it will be fallback to BlockCypher
     * @returns {Promise<null>}
     */
    public async getTransactionList(address: string, count: number = 99999, skip: number = 0) {
        const result = await this.callRPCProc("listtransactions", ["*", count, skip]);
        if (result.data.result.length === 0) {
            return await this.getTransactionsFromBlockCypher(address);
        }
    }

    private async calculateFee() {
        const fee = await this.getFeeFromBlockCypher();
        return fee.high_fee_per_kb / 100000000;
        // try {
        //   const estimateRawResp = await this.callRPCProc("estimaterawfee", [6]);
        //   const res = estimateRawResp.data.result;
        //   if (res.medium.fail.startrange !== 0) {
        //     return res.medium.fail.startrange;
        //   } else if (res.long.fail.startrange !== 0) {
        //     return res.long.fail.startrange;
        //   } else {
        //     return res.short.fail.startrange;
        //   }
        // } catch (e) {
        //   const fee: number = await this.getFeeFromBlockCypher();
        //   return fee / 100000;
        // }
    }

    private async getFeeFromBlockCypher() {
        const res = await axios.get("https://api.blockcypher.com/v1/btc/test3");
        return res.data;
    }

    private async getTransactionsFromBlockCypher(address: string) {
        const res = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=50`);
        return res.data;
    }
}
