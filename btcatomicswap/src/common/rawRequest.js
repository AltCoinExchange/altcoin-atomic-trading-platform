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
    console.log(err);
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
