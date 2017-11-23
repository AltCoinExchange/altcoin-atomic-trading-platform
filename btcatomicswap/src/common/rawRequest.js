const axios = require('axios');
import {configuration} from '../config/config';

const url =
  configuration.protocol + '://' +
  configuration.user + ':' +
  configuration.pass + '@' +
  configuration.host + ':' +
  configuration.port;

export const getRawChangeAddress = async () => {
  const data = {
    "method": "getrawchangeaddress",
    "rpcuser": configuration.user,
    "rpcpassword": configuration.pass,
  };
  try {
    const response = await axios.post(
      url,
      data,
      {
        auth: {
          username: configuration.user,
          password: configuration.pass,
        },
      },
    );
    return response.data.result;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

/**
 *
 * @param tx
 * @param feePerKb
 * @returns fundedTransaction, fee
 */
export const fundRawTransaction = async (tx, feePerKb,) => {
  try {
    return await axios.post(
      url,
      {
        "rpcuser": configuration.user,
        "rpcpassword": configuration.pass,
        "method": "fundrawtransaction",
        "params": [
          tx,
          {"feeRate": feePerKb},
        ],
      },
      {
        auth: {
          username: configuration.user,
          password: configuration.pass,
        },
      },
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const estimateFee = async () => {
  return await axios.post(
    url,
    {
      "rpcuser": configuration.user,
      "rpcpassword": configuration.pass,
      "method": "estimatesmartfee",
      "params": [6],
    },
    {
      auth: {
        username: configuration.user,
        password: configuration.pass,
      },
    },
  );
};

export const getUnspentOutputs = async (addr) => {
  // const urlQuery = "https://api.blockcypher.com/v1/btc/test3/addrs/" + addr + "?unspentOnly=true&includeScript=true"
  // const txrefs = res.data.txrefs
  // const unconfirmed_txrefs = res.data.unconfirmed_txrefs

  const numOfConfirmations = 1
  const urlQuery = "https://chain.so/api/v2/get_tx_unspent/BTCTEST/" + addr + "/" + numOfConfirmations
  const res = await axios.get(urlQuery)

  const unspentOutputs = res.data.data.txs
  // console.log(urlQuery);
  return unspentOutputs
};
