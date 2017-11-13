import {AddressUtil} from './common/address-util';
import {createSig} from './common/createSig';
import {publishTx} from './common/public-tx';
import {getRawChangeAddress} from './common/rawRequest';
import {configuration} from "./config/config"
import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {redeemP2SHContract} from './contract/redeem-P2SH-contract';
import {getFeePerKb} from './common/fee-per-kb';
import {feeForSerializeSize, estimateRedeemSerializeSize} from './common/sizeest';



const Script = require('bitcore').Script;
const Address = require('bitcore').Address;
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;


export async function redeem(strCt, strCtTx, secret) {
  console.log('REDEEMING');

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
  // const PK = PrivateKey.fromWIF(privateKey);
  // const newRawAddr = PK.toPublicKey().toAddress(configuration.network);
  // console.log('newRawAddr', newRawAddr);
  // TODO:  "getrawchangeaddres" + erroe await getChangeAddress()
  // const addr = new Address(newRawAddr);
  const addr = new Address(await getRawChangeAddress());

  const outScript = Script.buildPublicKeyHashOut(addr);

  // https://bitcoin.org/en/developer-examples#offline-signing
  const redeemTx = new Transaction()

  // TODO: "redeem output value of %v is dust"
  let output = Transaction.Output({
    script: outScript,
    satoshis: 0,
  })

  redeemTx.addOutput(output)

  const feePerKb = await getFeePerKb()
  const redeemSerializeSize = estimateRedeemSerializeSize(contract, redeemTx.outputs)

  const fee = feeForSerializeSize(feePerKb, redeemSerializeSize) * 100000000

  const amount = ctTx.outputs[ctTxOutIdx].satoshis - fee

  output = Transaction.Output({
    script: outScript,
    satoshis: amount
  })

  redeemTx.removeOutput(0)
  redeemTx.addOutput(output)


  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script),
  })

  redeemTx.uncheckedAddInput(input)


  const inputIndex = 0
  const {sig, pubKey} = await createSig(redeemTx, inputIndex, contract, recipientAddress);


  const script = redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);

  redeemTx.inputs[0].setScript(script)

  console.log("**redeem transaction  ", redeemTx);
  console.log("**redeem transaction  ", redeemTx.toString());
  let res;
  try {
    res = await publishTx(redeemTx.toString())

  } catch (e) {
    console.log(e);
  }
  console.log('RESPONSE!!! ', res);

  return {
    redeemTx,
    rawTx: res,
  }
}

const getChangeAddress = async function () {
  const redeemdAddr = await getRawChangeAddress();
  return redeemdAddr;
};
