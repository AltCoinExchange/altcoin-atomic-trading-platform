import {configuration} from '../config';
import {estimateFee} from './rawRequest';

const RpcClient = require('bitcoind-rpc');
const rpc = new RpcClient(configuration);

export const getFeePerKb = async () => {
  let getFee = new Promise((resolve, reject) => {
    rpc.getInfo((r, data) => {
      const info = data.result;
      const relayFee = info.relayfee;
      let maxFee = info.paytxfee;
      let useFee;

      if (info.paytxfee !== 0) {
        if (info.paytxfee > maxFee) {
          maxFee = relayFee;
        }
        useFee = maxFee;
        resolve(useFee);
      }
      resolve(undefined);
    });
  });

  const fee = await getFee;

  if (fee) {
    return fee;
  }

  const estimateRawResp = await estimateFee();
  return estimateRawResp.data.result;
};
