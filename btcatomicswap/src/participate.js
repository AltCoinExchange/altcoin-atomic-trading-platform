import {getUnixTimeFor2Days} from './common/unix-ts';
import {buildContract} from './contract/build-contract';

export const participate = (them, amount, secretHash) => {
  const lockTime = getUnixTimeFor2Days();
  buildContract(them, amount, lockTime, secretHash);
};
