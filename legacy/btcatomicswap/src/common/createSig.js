import {configuration} from '../config/config';
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;




export const createSig = async (reedemTx, inputIndex, contract, recipientAddress, privateKey) => {
  const wif = privateKey;
  const WIF = new PrivateKey(wif)
  const sighashType = 1
  const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract)
  const pubKey = WIF.toPublicKey()
  return {sig, pubKey}
}
