import {configuration} from '../config/config';

const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);


export const signTransaction = async (tx) => {
  return new Promise((resolve, reject) => {
    rpc.signRawTransaction(tx, (c, e) => {
      console.log(e);
      resolve(e.result);
    })
  });
};
