import {configuration} from '../config/config';

const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);

export async function createSig(addr){
// export async function createSig(tx, idx, pkScript, addr){
  wif = rpc.DumpPrivKey(addr)
  console.log(wif);
}
