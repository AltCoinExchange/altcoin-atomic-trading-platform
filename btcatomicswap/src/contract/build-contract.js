import {fundRawTransaction, getRawChangeAddress} from '../common/rawRequest';
import {atomicSwapContract} from './atomic-swap-contract';
import {getFeePerKb} from '../common/fee-per-kb';
import {signTransaction} from '../common/sign-transaction';
import {hash160} from '../common/secret-hash';

const Buffer = require('buffer/').Buffer;
const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;


export const buildContract = async (them, amount, lockTime, secretHash) => {
  await getChangeAddress();
  const refundAddr = new Address(await getChangeAddress());
  const refundAddrH = refundAddr.toString();

  try {
    const contract = atomicSwapContract(
      hash160(refundAddrH),
      hash160(them),
      lockTime,
      secretHash,
    );

    const contractP2SH = contract.toScriptHashOut();

    let feePerKb = await getFeePerKb();

    const transaction = new Transaction().fee(+amount);
    const output = Transaction.Output({
      script: contractP2SH,
      satoshis: amount * 100000000,
    });
    transaction.addOutput(output);

    try {
      const fundRawTx = await fundRawTransaction(transaction.toString(), feePerKb);
      const contractFee = fundRawTx.data.result.fee;
      const contractTx = await signTransaction(fundRawTx.data.result.hex);
      const contractTxHash = contractTx.hex;

      // TODO build REFUND !

      return {
        contract,
        contractP2SH,
        contractTxHash,
        contractTx,
        contractFee,
      }
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
  return refundAddr;
};
