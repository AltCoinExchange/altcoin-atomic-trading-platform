import {redeemP2SHContract} from './contract/redeem-P2SH-contract';
const Script = require('bitcore').Script;
const Address = require('bitcore').Address;
import {getRawChangeAddress} from './common/rawRequest';
const Transaction = require('bitcore').Transaction;
const Base58  = require('bitcore').encoding.Base58;
const Base58Check  = require('bitcore').encoding.Base58Check;
import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {createSig} from './common/createSig';
import {hash160} from './common/secret-hash';
import {AddressUtil} from './common/address-util';
const strPubKey = "03b10e3690bcaf0eae7098ec794666963803bcec5acfbe6a112bc8cdc93797f002"
import {configuration} from "./config/config"
import {publishTx} from "./common/public-tx.js"
import {getFeePerKb} from './common/fee-per-kb';


const util = require('util');


export async function redeem(strCt, strCtTx, secret) {

  // "contract is not an atomic swap script recognized by this tool"
  // "transaction does not contain a contract output"
  // "getrawchangeaddres" + erroe
  // "redeem output value of %v is dust"
  // "Redeem fee: %v (%0.8f BTC/kB)\n\n"
  // "Redeem transaction (%v):\n"

  // TODO: clean the tempInput, reedemTxTemp
  // TODO: change strCt, strCtTx to ct, ctTx
  const contract = new Script(strCt);
  const pushes = extractAtomicSwapContract(strCt)

  const ctTx = new Transaction(strCtTx)

  const recipientAddrString = pushes.recipientHash.replace('0x', '');
  const recipientAddress = AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');
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
    return "transaction does not contain a contract output"
  }


  const addr = new Address(await getChangeAddress())
  const outScript = Script.buildPublicKeyHashOut(addr)
  const amount = ctTx.outputs[ctTxOutIdx].satoshis - 0.0005*100000000

  // https://bitcoin.org/en/developer-examples#offline-signing
  const reedemTx = new Transaction()
  const reedemTxTemp = new Transaction()

  let output = Transaction.Output({
    script: outScript,
    satoshis: amount
  })
  reedemTxTemp.addOutput(output)
  // createSig(recipientAddress)
  console.log("---------");
  // console.log(Transaction.Sighash);
  console.log("**addr", addr);

  const tAddr = "mhv5J1ymh9Hd5tk1YuKvmXCbV63whjyxmT";

  const tempInput = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  })

  console.log(reedemTxTemp.uncheckedAddInput(tempInput));
  const {sig, pubKey} = await createSig(reedemTxTemp, 0, contract, recipientAddress )



  // const script = redeemP2SHContract(strCt, sig.toString(), pubKey.toString(), secret);
  const script = redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);
  console.log(script);


  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: script
  })
  // reedemTx.addInput(input, outScript, amount)
  reedemTx.uncheckedAddInput(input)
  reedemTx.addOutput(output)
  // console.log(reedemTxTemp.inputs[0].setScript(script));
  console.log(reedemTxTemp);
  console.log("**reedemTx  ", reedemTx.toString());
  console.log("**reedemTx  ", reedemTx);
  console.log(reedemTx.verify());
  const res = await publishTx(reedemTx.toString())
  // const res = await publishTx(reedemTx)
  console.log(res);


  // return reedemTx

}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
