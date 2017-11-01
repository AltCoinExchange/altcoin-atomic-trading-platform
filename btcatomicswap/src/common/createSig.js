import {configuration} from '../config/config';
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;



const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);

// export async function createSig(addr){
export async function createSig(tx, idx, pkScript, addr){
  const wif = await getPrivKey(addr)
  const WIF = new PrivateKey(wif)
  const sig = Transaction.Sighash.sign(tx, WIF, 1, idx, pkScript)
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
