import {configuration} from '../config/config';
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;



const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);

export async function createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey){
  const wif = privateKey;
  console.log('wif', wif);
  const WIF = new PrivateKey(wif)
  console.log('WIF', WIF);
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
