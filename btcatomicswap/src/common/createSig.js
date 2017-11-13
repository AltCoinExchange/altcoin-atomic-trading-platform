import {configuration} from '../config/config';
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;



const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);

export async function createSig(reedemTx, inputIndex, contract, recipientAddress){
  const wif = await getPrivKey(recipientAddress)
  const WIF = new PrivateKey(wif)
  const sighashType = 1
  const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract)
  const pubKey = WIF.toPublicKey()
  return {sig, pubKey}
}

const getPrivKey = async (addr) => {
  return new Promise((resolve, reject) => {
    rpc.dumpPrivKey(addr, (c, e) => {
      resolve(e.result);
    })
  });
};
