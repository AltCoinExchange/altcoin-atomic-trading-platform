import {AddressUtil} from './common/address-util';
import {createSig} from './common/createSig';
import {getRawChangeAddress} from './common/rawRequest';
import {configuration} from "./config/config"
import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {redeemP2SHContract} from './contract/redeem-P2SH-contract';
import {publishTx} from './common/public-tx';

const Script = require('bitcore').Script;
const Address = require('bitcore').Address;
const Transaction = require('bitcore').Transaction;


const util = require('util');


export async function redeem(strCt, strCtTx, secret, privateKey) {

  // TODO: change strCt, strCtTx to ct, ctTx
  const contract = new Script(strCt);
  const pushes = extractAtomicSwapContract(strCt)

  if (!pushes) {
    console.log("contract is not an atomic swap script recognized by this tool");
    return
  }

  const ctTx = new Transaction(strCtTx)

  const recipientAddrString = pushes.recipientHash.replace('0x', '');
  const recipientAddress = AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');
  const contractP2SH = AddressUtil.NewAddressScriptHash(strCt, configuration.network);

  let ctTxOutIdx = -1


  for (let i = 0; i < ctTx.outputs.length; i++) {
    const script = new Script(ctTx.outputs[i].script)
    const address = script.toAddress(configuration.network)
    const addressHash = address.toJSON().hash;

    if (addressHash === contractP2SH.toJSON().hash) {
      ctTxOutIdx = i
      break
    }
  }

  if (ctTxOutIdx == -1) {
    console.log("transaction does not contain a contract output");
    return
  }

  // TODO:  "getrawchangeaddres" + erroe
  const addr = new Address(await getChangeAddress())

  const outScript = Script.buildPublicKeyHashOut(addr)
  const amount = ctTx.outputs[ctTxOutIdx].satoshis - 0.0005 * 100000000

  // https://bitcoin.org/en/developer-examples#offline-signing
  const redeemTx = new Transaction()

  // TODO: "redeem output value of %v is dust"
  let output = Transaction.Output({
    script: outScript,
    satoshis: amount,
  })
  redeemTx.addOutput(output)


  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script),
  })

  redeemTx.uncheckedAddInput(input)


  const inputIndex = 0
  const {sig, pubKey} = await createSig(redeemTx, inputIndex, contract, recipientAddress, privateKey);


  const script = redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);

  redeemTx.inputs[0].setScript(script)

  console.log("**redeem transaction  ", redeemTx);
  const res = await publishTx(redeemTx.toString())


  return {
    redeemTx,
    rawTx: res
  }
}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  return refundAddr;
};
