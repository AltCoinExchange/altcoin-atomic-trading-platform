import {redeemP2SHContract} from './redeemP2SHContract';
const Script = require('bitcore').Script;
const Address = require('bitcore').Address;
import {getRawChangeAddress} from './common/rawRequest';
const Transaction = require('bitcore').Transaction;
const Base58  = require('bitcore').encoding.Base58;
const Base58Check  = require('bitcore').encoding.Base58Check;
import {extractAtomicSwapContract} from './contract/extract-atomic-swap-contract';
import {createSig} from './common/createSig';
import {hash160} from './common/secret-hash';

// const util = require('util')

export async function redeem(ct, ctTx, secret) {
  // console.log(ctTx);
  const pushes = extractAtomicSwapContract(ct)
  ctTx = new Transaction(ctTx)
  // console.log(require('util').inspect(Transaction.Output, { depth: null }));
  // console.log(require('util').inspect(ctTx, { depth: null }));
  // console.log(ctTx);
  const hash = pushes.recipientHash.replace('0x', '');
  console.log('hash', hash);

  const encoded = Base58Check.encode(Buffer.from(hash));
  const base58 = Base58.encode(Buffer.from(hash));

  console.log('encoded', encoded);
  console.log('base58', base58);
  console.log(new Address(encoded));
  // const recipientHashString = pushes.recipientHash.replace('0x', '');
  // const recipientHash = new Address(recipientHashString, 'testnet')

  // console.log(new Script(recipientHashString).toScriptHashOut().toAddress());
  // console.log(new Script(recipientHashString).toAddress());
  //const recipientHash = new Address(hash160(recipientHashString), 'testnet')

  // console.log("**recipientHash   ", recipientHash);
  // 0xebcf822c4a2cdb5f6a6b9c4a59b74d66461da581

  // createSig()
  // console.log('address: ', new Script(recipientHashString).toScriptHashOut().toAddress().toJSON());
  //const recipientHash = new Address(hash160(recipientHashString), 'testnet')
  // console.log("**recipientHash   ", recipientHash);
  // createSig()

  const contract = new Script(ct);
  console.log("**Script:   ", contract);
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

  // const output = Transaction.output({
  //   script: outScript,
  //   satoshis: amount*100000000
  // })
  //
  // const script = redeemP2SHContract(strContract, strSig, strPubkey, strSecret);
  //
  // const input = Transaction.input({
  //   prevTxId: ctTx.id,
  //   outputIndex: ctTxOutIdx,
  //   script:
  // })


  // check the contract
  // return errors.New("contract is not an atomic swap script recognized by this tool")



  // check if the contractTx containes the contract
  // and return the index of the contract
  // return errors.New("transaction does not contain a contract output")

  // const script = redeemP2SHContract(contract, sig, pubkey, secret);
}

const getChangeAddress = async function () {
  const refundAddr = await getRawChangeAddress();
  // const addressHex = new Buffer(refundAddr, 'hex');
  return refundAddr;
};
