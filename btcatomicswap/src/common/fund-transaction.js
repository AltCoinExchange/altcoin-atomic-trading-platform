const RpcClient = require('bitcoind-rpc');
import {configuration} from '../config/config';
import {getUnspentOutputs} from "./rawRequest"

const UnspentOutput = require('bitcore').Transaction.UnspentOutput;
const Transaction = require('bitcore').Transaction

const rpc = new RpcClient(configuration);

export const fundTransaction = async (addr, tx) => {
  const txT = new Transaction(tx.toString())
  console.log(8);
  const unspentOutputs = await getUnspentOutputs(addr.toString())
  for (let output of unspentOutputs){

    //BLOCKCYPHER
    // let utxo = new UnspentOutput({
    //   "txId" : output.tx_hash,
    //   "outputIndex" : output.tx_output_n,
    //   "address" : addr,
    //   "script" : output.script,
    //   "satoshis" : output.value
    // });

    //CHAIN.SO
    let utxo = new UnspentOutput({
      "txId" : output.txid,
      "outputIndex" : output.output_no,
      "address" : addr,
      "script" : output.script_hex,
      "satoshis" : output.value*100000000
    });


    //HINT: utxo can be a instance of UnspentOutput or a object with the necessery parametars
    tx.from(utxo)
    // console.log(utxo);
    if(tx._getOutputAmount()<tx._getInputAmount()){
      break
    }
  }

  if(tx._getOutputAmount()>tx._getInputAmount()){
    return "insufficent funds"
  }

  // TODO: feejevi
  // console.log("**tx.getFee() ", tx.getFee());

  console.log(tx);
  tx.change(addr)

  return tx
};
