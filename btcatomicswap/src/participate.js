import {getUnixTimeFor2Days} from './common/unix-ts';
import {buildContract} from './contract/build-contract';
import {publishTx} from './common/public-tx';

export const participate = async (them, amount, secretHash, privkey) => {
  const lockTime = getUnixTimeFor2Days();
  const b = await buildContract(them, amount, lockTime, secretHash, privkey);

  const rawTx = await publishTx(b.contractTx.hex);

  console.log('Secret hash:         ', secretHash);
  console.log('Contract fee:        ', b.contractFee);
  console.log('Refund fee:          ', '-- TODO --');
  console.log('\n');
  console.log(
    'Contract:            ',
    '(' + b.contractP2SH.toString() + ')',
  );
  console.log(b.contract.toHex());
  console.log('\n');
  console.log('Contract transaction:', '(' + b.contractTxHash + ')');
  console.log(b.contractTx.hex);
  console.log('\n');
  console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
  console.log(b.refundTx.toString());
  console.log('Published contract transaction: ', rawTx);
  return {
    fee: b.contractFee,
    contract: b.contractP2SH.toString(),
    contractHex: b.contract.toHex(),
    contractTx: b.contractTx,
    contractTxHex: b.contractTx.hex,
    rawTx,
  }
};
