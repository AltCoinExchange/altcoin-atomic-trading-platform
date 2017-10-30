import {buildContract} from './contract/build-contract';
import {generateSecret} from './common/secret-hash';
import {getUnixTimeFor2Days} from './common/unix-ts';
import {publishTx} from './common/public-tx';

export async function initiate(cp2Addr, amount) {

  const {secret, secretHash} = generateSecret();
  const lockTime = getUnixTimeFor2Days();
  const b = await buildContract(cp2Addr, amount, lockTime, secretHash);
  const rawTx = await publishTx(b.contractTxHash);

  console.log('Secret:              ', secret);
  console.log('Secret hash:         ', secretHash);
  console.log('Contract fee:        ', b.contractFee);
  console.log('Refund fee:          ', '-- TODO --');
  console.log('\n');
  console.log(
    'Contract:            ',
    '(', b.contractP2SH.toAddress().toString(), ')',
    '-- TODO -- PLEASE CHECK',
  );
  console.log(b.contract.toHex());
  console.log('\n');
  console.log('Contract transaction:', '(', b.contractP2SH.toAddress().toString(), '-- TODO --', ')');
  console.log(b.contractTxHash);
  console.log('\n');
  console.log('Refund transaction:  ', '(', '-- TODO --', ')');
  console.log('Published contract transaction: ', rawTx);
}
