import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';

const Script = require('bitcore').Script;
const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;

const Hash = require('bitcore').crypto.Hash;
const BN = require('bitcore').crypto.BN;


export const auditContract = (ct, tx) => {

  const contract = new Script(ct);
  const contractScriptHashOut = contract.toScriptHashOut();
  const contractAddress = contractScriptHashOut.toAddress();
  const contractAddressString = contractScriptHashOut.toAddress().toJSON().hash;

  const transaction = new Transaction(tx);

  const hasTxOut = transaction.toJSON().outputs.some((output => {
    const script = new Script(output.script);
    const address = script.toAddress('testnet');
    const addressHash = address.toJSON().hash;
    return addressHash === contractAddressString;
  }));

  if (!hasTxOut) {
    console.error('transaction does not contain the secret');
    return;
  }

  const pushes = extractAtomicSwapContract(ct);

  const recipientAddrString = pushes.recipientHash.replace('0x', '');
  const refundAddressString = pushes.refundHash160.replace('0x', ''); // -> mpRMZoyNoFc3sYfZsvVcfnSvR6B4SYuM2W


  // let pubKeyHashAddress = new Address(new Buffer(toBase16(recipientAddrString)));
  //
  // console.log('pubKeyHashAddress', pubKeyHashAddress);
  // console.log(pubKeyHashAddress.isPayToPublicKeyHash());
  //


  const refundAddress = pushes.refundHash160; //todo
  // console.log('Contract address:       ', ct);
  console.log('Contract value:         ', 'todo');
  console.log('Recipient address:      ', recipientAddrString); // msZVEMShiSmZtzYc64ggSmu4VKLTWCqEF5 -> should be
  console.log('Authors refund address: ', refundAddress);
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('Locktime:               ', new Date(pushes.lockTime * 1000));
};

function toBase16(val) {
  let result = [];
  for (let i = 0; i < val.length; i = i + 2) {
    result.push(parseInt(val[i] + val[i + 1], 16));
  }
  return result;
}

/**
 * TODO GOAL!!!!!
 *
 *

 Contract address:        2Mvyb3QKtiHgwgxYLJin3iQYLN3sDJ3dnjq
 Contract value:          0.01 BTC
 Recipient address:       mvJQhCbsH22Rq32apjuCast1RmY1kTo8G5
 Author's refund address: mpRMZoyNoFc3sYfZsvVcfnSvR6B4SYuM2W

 Secret hash: 1c43aad028199ba9a06c88cc350ef068f50808c6

 */
