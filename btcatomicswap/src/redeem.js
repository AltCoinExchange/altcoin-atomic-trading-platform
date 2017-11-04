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

  // TODO: change strCt, strCtTx to ct, ctTx
  const contract = new Script(strCt);
  const pushes = extractAtomicSwapContract(strCt)

  if(!pushes){
    console.log("contract is not an atomic swap script recognized by this tool");
    return
  }

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
    console.log("transaction does not contain a contract output");
    return
  }

  // TODO:  "getrawchangeaddres" + erroe
  const addr = new Address(await getChangeAddress())

  const outScript = Script.buildPublicKeyHashOut(addr)
  const amount = ctTx.outputs[ctTxOutIdx].satoshis - 0.0005*100000000

  // https://bitcoin.org/en/developer-examples#offline-signing
  const reedemTx = new Transaction()

  // TODO: "redeem output value of %v is dust"
  let output = Transaction.Output({
    script: outScript,
    satoshis: amount
  })
  reedemTx.addOutput(output)


  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  })

  reedemTx.uncheckedAddInput(input)


  const inputIndex = 0
  const {sig, pubKey} = await createSig(reedemTx, inputIndex, contract, recipientAddress )


  const script = redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);

  reedemTx.inputs[0].setScript(script)

  console.log("**redeem transaction  ", redeemTx);
  console.log("**redeem fee");
  // console.log(reedemTx.verify());
  const res = await publishTx(reedemTx.toString())
  console.log(res);


  // return reedemTx

}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
