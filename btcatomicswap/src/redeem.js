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


const util = require('util');


export async function redeem(strCt, strCtTx, secret) {


  const contract = new Script(strCt);
  const pushes = extractAtomicSwapContract(strCt)

  const ctTx = new Transaction(strCtTx)

  const recipientAddrString = pushes.recipientHash.replace('0x', '');
  const recipientAddress = AddressUtil.NewAddressPubKeyHash(recipientAddrString, 'testnet');

  const contractSH = AddressUtil.NewAddressScriptHash(strCt, 'testnet').toString();

  const contractScriptHashOut = contract.toScriptHashOut();
  const contractAddress = contractScriptHashOut.toAddress();
  const contractAddressString = contractScriptHashOut.toAddress().toJSON().hash;

  // console.log(ctTx.outputs.length);
  // console.log(ctTx.outputs[0]);
  // console.log(ctTx.outputs[0].script);
  let ctTxOutIdx = -1

  for(let i = 0; i<ctTx.outputs.length; i ++ ){
    const script = new Script(ctTx.outputs[i].script)
    const address = script.toAddress("testnet")
    const addressHash = address.toJSON().hash;


    // TODO: implement a check to see if its a p2sh and then check the address
    if (addressHash === contractAddressString){
      ctTxOutIdx = i
      break
    }
  }
  console.log(pushes.recipientHash);

  console.log(ctTxOutIdx);
  // let addr = await getChangeAddress()
  const addr = new Address(await getChangeAddress())
  console.log(addr);
  const outScript = Script.buildPublicKeyHashOut(addr)
  console.log(outScript);

  // TODO:
  // console.log(ctTx.outputs[ctTxOutIdx].satoshis);
  const amount = ctTx.outputs[ctTxOutIdx].satoshis
  console.log(amount);
  const reedemTx = new Transaction()
  console.log(reedemTx);
  let output = Transaction.Output({
    script: outScript,
    satoshis: amount
  })
  reedemTx.addOutput(output)
  console.log(reedemTx);
  // createSig(recipientAddress)
  console.log("---------");
  // console.log(Transaction.Sighash);
  const tAddr = "n4Fc4SbP7tqhCVch1eVS8sj9E919X1SUqS";
  // const script = redeemP2SHContract(strContract, strSig, strPubkey, strSecret);
  //
  const input = Transaction.Input({
    prevTxId: ctTx.id,
    outputIndex: ctTxOutIdx,
    script: new Script(ctTx.outputs[ctTxOutIdx].script)
  })

  console.log(input);
  console.log(reedemTx.uncheckedAddInput(input));
  const {sig, pubKey} = await createSig(reedemTx, 0, contract, tAddr )
  // const obj = await createSig(reedemTx, 0, contract, tAddr )
  // console.log(obj);
  console.log(sig);
  console.log(pubKey);
  //
  console.log("**strCt  ", strCt);
  console.log("**Ct  ", contract.toHex());
  console.log("**strCtTx  ", strCtTx);
  console.log("**CtTx  ", ctTx);
  console.log("**Pubkey  ", pubKey.toString());
  // console.log("**strPubkey  ", strPubkey);
  console.log("**secret  ", secret);
  console.log("**verify  ", sig);
  console.log("**sig  ", sig.toString())

  // const script = redeemP2SHContract(strCt, sig, pubKey.toString(), secret);

  // check the contract
  // return errors.New("contract is not an atomic swap script recognized by this tool")



  // check if the contractTx containes the contract
  // and return the index of the contract
  // return errors.New("transaction does not contain a contract output")

}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
