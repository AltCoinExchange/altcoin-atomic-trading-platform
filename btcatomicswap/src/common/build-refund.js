import {AddressUtil} from './address-util';
import {configuration} from '../config/config';
import {getRawChangeAddress} from './rawRequest';
import {extractAtomicSwapContract} from '../contract/extract-atomic-swap-contract';
import {ScriptUtil} from './script-util';
import {hash160} from './secret-hash';

const Address = require('bitcore').Address;
const Transaction = require('bitcore').Transaction;
const Script = require('bitcore').Script;

export const buildRefund = async (contract, contractTx) => {
  const contractP2SH = AddressUtil.NewAddressScriptHash(contract.toHex(), configuration.network);
  const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);
  const contractTxHash = contractTx.hex;
  // contractOutPoint todo

  const refundAddress = await getRawChangeAddress();
  const refundOutScript = ScriptUtil.payToPubKeyHashScript(hash160(refundAddress));
  const pushes = extractAtomicSwapContract(contract);
  const refundAddr = AddressUtil.NewAddressPubKeyHash(pushes.refundHash160, configuration.network);

  const refundTx = new Transaction();
  refundTx.lockUntilDate(pushes.lockTime);
  refundTx.addOutput(Transaction.Output({
    script: refundOutScript,
    satoshis: 0, // ammount set bellow
  }));

  // const refundSize; TODO
  // const refundFee; TODO


};
