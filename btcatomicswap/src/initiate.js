import {buildContract} from './contract/build-contract';
import {generateSecret} from './common/secret-hash';
import {getUnixTimeFor2Days} from './common/unix-ts';
import {publishTx} from './common/public-tx';

export async function initiate(cp2Addr, amount) {

  const {secret, secretHash} = generateSecret();

  console.log('** secret    ', secret);
  console.log('** secretHash    ', secretHash);

  const lockTime = getUnixTimeFor2Days();
  console.log('lockTime', lockTime);
  console.log('build');
  const signedTx = await buildContract(cp2Addr, amount, lockTime, secretHash);
  const rawTx = await publishTx(signedTx);
  console.log('** rawTx   ', rawTx);

  return rawTx;
}
