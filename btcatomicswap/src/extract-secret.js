import {ripemd160} from './common/secret-hash';
import {flatMap} from './common/util';

const buffer = require('buffer');
const Transaction = require('bitcore').Transaction;
const Script = require('bitcore').Script;


export const extractSecret = (redemptionTx, secretHash) => {
  const transaction = new Transaction(redemptionTx);
  const txData = flatMap(
    transaction.toJSON().inputs.map(input => {
      const script = new Script(input.scriptString);
      const pops = script.toString().split(' ');
      const data = pops.filter(opcode => opcode.indexOf('0x') !== -1).map(opdata => opdata.replace('0x', ''));
      return data;
    }),
  );
  const secret = txData.find(sc => {
    return ripemd160(buffer.Buffer.from(sc, "hex")) === secretHash;
  });
  return secret;
};
