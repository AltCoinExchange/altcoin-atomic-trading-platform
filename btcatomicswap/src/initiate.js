import {buildContract} from './contract/build-contract';
import {generateSecret} from './common/secret-hash';
import {getUnixTimeFor2Days} from './common/unix-ts';
import {publishTx} from './common/public-tx';

export async function initiate(cp2Addr, amount) {

  const {secret, secretHash} = generateSecret();
  const lockTime = getUnixTimeFor2Days();
  const b = await buildContract(cp2Addr, amount, lockTime, secretHash);

  const rawTx = await publishTx(b.contractTx.hex);

  console.log('Secret:              ', secret);
  console.log('Secret hash:         ', secretHash);
  console.log('Contract fee:        ', b.contractFee);
  console.log('Refund fee:          ', b.refundFee);
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
    secret,
    secretHash,
    fee: b.contractFee,
    contract: b.contractP2SH.toString(),
    contractHex: b.contract.toHex(),
    contractTx: b.contractTx,
    contractTxHex: b.contractTx.hex,
    rawTx,
  }
}
