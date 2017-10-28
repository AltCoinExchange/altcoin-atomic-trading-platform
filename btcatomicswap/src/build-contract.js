import {fundRawTransaction, getRawChangeAddress} from './common/rawRequest';
import {atomicSwapContract} from './atomic-swap-contract';
import {getFeePerKb} from './common/fee-per-kb';
import {signTransaction} from './common/sign-transaction';
import {hash160} from './common/secret-hash';

const Buffer = require('buffer/').Buffer;
const Transaction = require('bitcore').Transaction;


export const buildContract = async (them, amount, lockTime, secretHash) => {

  const refundAddr = await getChangeAddress();
  let refundAddrH = refundAddr.toString();

  try {
    const contract = atomicSwapContract(
      hash160(refundAddrH),
      hash160(them),
      lockTime,
      secretHash,
    );
    console.log('** contract    ', contract.toHex());

    const contractP2SH = contract.toScriptHashOut();

    let feePerKb = await getFeePerKb();
    console.log('** feePerKb    ', feePerKb);

    const transaction = new Transaction().fee(+amount);
    const output = Transaction.Output({
      script: contractP2SH,
      satoshis: amount * 100000000,
    });
    transaction.addOutput(output);

    try {
      const fundRawTx = await fundRawTransaction(transaction.toString(), feePerKb);
      const signedTx = await signTransaction(fundRawTx.data.result.hex);
      console.log('** signedTx    ', signedTx.hex);
      return signedTx.hex;
    } catch (fundErr) {
      if (fundErr && fundErr.response) {
        console.log('fundErr', fundErr.response.data, 'fundErr');
      } else {
        console.log('fundErr', fundErr, 'fundErr');
      }
    }
  } catch (err) {
    console.log('err: ', err);
  }
};


const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  const addressHex = new Buffer(refundAddr).toString('hex');
  return addressHex;
};
