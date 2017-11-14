import {getUnspentOutputs} from './rawRequest';

const UnspentOutput = require('bitcore').Transaction.UnspentOutput;

export const fundTransaction = async (addr, tx) => {
  const unspentOutputs = await getUnspentOutputs(addr.toString());
  for (let output of unspentOutputs) {

    //BLOCKCYPHER
    // let utxo = new UnspentOutput({
    //   "txId" : output.tx_hash,
    //   "outputIndex" : output.tx_output_n,
    //   "address" : addr,
    //   "script" : output.script,
    //   "satoshis" : output.value
    // });
    const value = Math.round(output.value * 100000000)

    // console.log(output.value * 100000000);
    // console.log(value);
    //CHAIN.SO
    let utxo = new UnspentOutput({
      'txId': output.txid,
      'outputIndex': output.output_no,
      'address': addr,
      'script': output.script_hex,
      'satoshis': value,
    });


    //HINT: utxo can be a instance of UnspentOutput or a object with the necessery parametars
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
