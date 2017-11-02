import {fundRawTransaction, getRawChangeAddress} from '../common/rawRequest';
import {atomicSwapContract} from './atomic-swap-contract';
import {getFeePerKb} from '../common/fee-per-kb';
import {signTransaction} from '../common/sign-transaction';
import {hash160} from '../common/secret-hash';
import {AddressUtil} from '../common/address-util';
import {buildRefund} from '../common/build-refund';
import {configuration} from '../config/config';

const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const Script = require('bitcore').Script;


export const buildContract = async (them, amount, lockTime, secretHash) => {
  const refundAddr = new Address(await getRawChangeAddress());
  const refundAddressHash = refundAddr.toJSON().hash;
  const themHash = new Address(them).toJSON().hash;

  try {
    const contract = atomicSwapContract(
      refundAddressHash,
      themHash,
      lockTime,
      secretHash,
    );

    const contractP2SH = AddressUtil.NewAddressScriptHash(contract.toHex(), configuration.network);
    const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);
    const feePerKb = await getFeePerKb();

    const transaction = new Transaction().fee(+amount * 100000000);
    const output = Transaction.Output({
      script: contractP2SHPkScript,
      satoshis: amount * 100000000,
    });
    transaction.addOutput(output);

    try {
      const fundRawTx = await fundRawTransaction(transaction.toString(), feePerKb);
      const contractFee = fundRawTx.data.result.fee;
      const contractTx = await signTransaction(fundRawTx.data.result.hex);
      const contractTxHash = contractTx.hex;

      // TODO build REFUND !
      await buildRefund(contract, contractTx);

      return {
        contract,
        contractP2SH,
        contractP2SHPkScript,
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
