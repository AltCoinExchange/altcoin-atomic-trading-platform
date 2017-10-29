import {hash160} from './common/secret-hash';

const Transaction = require('bitcore').Transaction;
const Script = require('bitcore').Script;


export const extractSecret = (redemptionTx, secretHash) => {
  const transaction = new Transaction(redemptionTx);

  let secret;
  transaction.toJSON().inputs.some(input => {
    const script = new Script(input.scriptString);
    const pops = script.toString().split(' ');
    const data = pops.filter(opcode => opcode.indexOf('0x') !== -1).map(opdata => opdata.replace('0x', ''));

    const sc = data.find((d) => {
      return hash160(Buffer.from(d, "hex")) === secretHash;
    });
    secret = sc;

    return sc;
  });
  console.log(secret);
  return secret;
};
