import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {AddressUtil} from './common/address-util';
import {configuration} from './config/config';

const Script = require('bitcore').Script;
const Transaction = require('bitcore').Transaction;

export const auditContract = (ct, tx) => {

  const contract = new Script(ct);
  const contractScriptHashOut = contract.toScriptHashOut();
  const contractAddress = contractScriptHashOut.toAddress();
  const contractAddressString = contractAddress.toJSON().hash;

  const transaction = new Transaction(tx);

  const hasTxOut = transaction.toJSON().outputs.find((output => {
    const script = new Script(output.script);
    const address = script.toAddress(configuration.network);
    const addressHash = address.toJSON().hash;
    return addressHash === contractAddressString;
  }));

  if (!hasTxOut) {
    console.error('transaction does not contain the secret');
    return;
  }

  const pushes = extractAtomicSwapContract(ct);

  const recipientAddrString = pushes.recipientHash.replace('0x', '');
  const recipientAddress = AddressUtil.NewAddressPubKeyHash(recipientAddrString, configuration.network);

  const refundAddressString = pushes.refundHash160.replace('0x', '');
  const refundAddress = AddressUtil.NewAddressPubKeyHash(refundAddressString, configuration.network);

  const contractSH = AddressUtil.NewAddressScriptHash(ct, configuration.network).toString();
  const contractValue = hasTxOut.satoshis / 100000000 + ' BTC';

  console.log('Contract address:       ', contractSH);
  console.log('Contract value:         ', contractValue);
  console.log('Recipient address:      ', recipientAddress.toString());
  console.log('Authors refund address: ', refundAddress.toString());
  console.log('\n');
  console.log('Secret hash:            ', pushes.secretHash.replace('0x', ''));
  console.log('\n');
  console.log('Locktime:               ', new Date(pushes.lockTime * 1000));

  return {
    contractSH,
    contractValue,
    recipientAddress: recipientAddress.toString(),
    refundAddress: refundAddress.toString(),
    secretHash: pushes.secretHash.replace('0x', ''),
    lockTime: new Date(pushes.lockTime * 1000),
  }
};
