import {refundP2SHContract} from "../contract/refund-P2SH-contract"
const Script = require('bitcore').Script;
const Address = require('bitcore').Address;
import {getRawChangeAddress} from './rawRequest';
const Transaction = require('bitcore').Transaction;
import {extractAtomicSwapContract} from '../contract/extract-atomic-swap-contract';
import {createSig} from './createSig';
import {AddressUtil} from './address-util';
import {configuration} from "../config/config"
import {publishTx} from "./public-tx.js"
import {getFeePerKb} from './fee-per-kb';
import {feeForSerializeSize, estimateRefundSerializeSize} from './sizeest';
const BufferReader  = require('bitcore').encoding.BufferReader;

export async function buildRefund(strCt, strCtTx, privateKey) {


  // TODO: change strCt, strCtTx to ct, ctTx
  const contract = new Script(strCt);
  const pushes = extractAtomicSwapContract(strCt)

  if(!pushes){
    console.log("contract is not an atomic swap script recognized by this tool");
    return
  }

  const ctTx = new Transaction(strCtTx)

  const refundAddrString = pushes.refundHash160.replace('0x', '');
  const refundAddress = AddressUtil.NewAddressPubKeyHash(refundAddrString, 'testnet');

  const contractP2SH = AddressUtil.NewAddressScriptHash(strCt, configuration.network);

  let ctTxOutIdx = -1


  for(let i = 0; i<ctTx.outputs.length; i ++ ){
    const script = new Script(ctTx.outputs[i].script)
    const address = script.toAddress(configuration.network)
    const addressHash = address.toJSON().hash;

    if (addressHash === contractP2SH.toJSON().hash){
      ctTxOutIdx = i
      break
    }
  }

  if (ctTxOutIdx == -1) {
    console.log("transaction does not contain a contract output");
    return
  }

  // TODO:  "getrawchangeaddres" + erroe
  // const addr = new Address(await getChangeAddress())
  const addr = "mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ"

  const outScript = Script.buildPublicKeyHashOut(addr)


  // https://bitcoin.org/en/developer-examples#offline-signing
  const refundTx = new Transaction()
  const lockTime = new BufferReader(pushes.lockTime).readUInt32LE()
  refundTx.lockUntilDate(lockTime)

  // TODO: "refund output value of %v is dust"
  let output = Transaction.Output({
    script: outScript,
    satoshis: 0
  })

  refundTx.addOutput(output)

  const feePerKb = await getFeePerKb()
  const redeemSerializeSize = estimateRefundSerializeSize(contract, refundTx.outputs)

  const refundFee = feeForSerializeSize(feePerKb, redeemSerializeSize) * 100000000

  const amount = ctTx.outputs[ctTxOutIdx].satoshis - refundFee

  output = Transaction.Output({
    script: outScript,
    satoshis: amount
  })

  refundTx.removeOutput(0)
  refundTx.addOutput(output)


  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    sequenceNumber: 0,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  })

  refundTx.uncheckedAddInput(input)


  const inputIndex = 0
  const {sig, pubKey} = await createSig(refundTx, inputIndex, contract, refundAddress, privateKey)

  const script = refundP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString());

  refundTx.inputs[0].setScript(script)


  return {
    refundFee,
    refundTx
  }

}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
