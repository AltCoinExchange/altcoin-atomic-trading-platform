import {configuration} from '../config';

const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);


export const signTransaction = async (tx) => {
  return new Promise((resolve, reject) => {
    rpc.signRawTransaction(tx, (c, e) => {
      resolve(e.result);
    })
  });
};