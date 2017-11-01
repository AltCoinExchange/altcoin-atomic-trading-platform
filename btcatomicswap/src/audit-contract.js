import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {AddressUtil} from './common/address-util';

const Script = require('bitcore').Script;
const Transaction = require('bitcore').Transaction;

export const auditContract = (ct, tx) => {

  const contract = new Script(ct);
  const contractScriptHashOut = contract.toScriptHashOut();
  const contractAddress = contractScriptHashOut.toAddress();
  const contractAddressString = contractAddress.toJSON().hash;

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
  const recipientAddress = AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');

  const refundAddressString = pushes.refundHash160.replace('0x', ''); // -> mpRMZoyNoFc3sYfZsvVcfnSvR6B4SYuM2W
  const refundAddress = AddressUtil.NewAddressPubKeyHash(refundAddressString, 'testnet');


  console.log('Contract address:       ', AddressUtil.NewAddressScriptHash(ct).toString());
  console.log('Contract value:         ', 'todo');
  console.log('Recipient address:      ', recipientAddress.toString());
  console.log('Authors refund address: ', refundAddress.toString());
  console.log('\n');
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('\n');
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
