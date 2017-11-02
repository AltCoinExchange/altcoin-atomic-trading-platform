import {getUnixTimeFor2Days} from './common/unix-ts';
import {buildContract} from './contract/build-contract';

export const participate = async (them, amount, secretHash) => {
  const lockTime = getUnixTimeFor2Days();
  const b = await buildContract(them, amount, lockTime, secretHash);
  
};
