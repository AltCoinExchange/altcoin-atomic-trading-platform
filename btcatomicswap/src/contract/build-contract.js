import {fundRawTransaction, getRawChangeAddress} from '../common/rawRequest';
import {atomicSwapContract} from './atomic-swap-contract';
import {getFeePerKb} from '../common/fee-per-kb';
import {signTransaction} from '../common/sign-transaction';
import {fundTransaction} from '../common/fund-transaction';
import {AddressUtil} from '../common/address-util';
import {buildRefund} from '../common/build-refund';
import {configuration} from '../config/config';

const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const Script = require('bitcore').Script;
const PrivateKey = require('bitcore').PrivateKey;


export const buildContract = async (them, amount, lockTime, secretHash, privateKey) => {
  const PK = PrivateKey.fromWIF(privateKey);
  const refundAddr = PK.toPublicKey().toAddress(configuration.network);
  const themAddr = new Address(them);


  const contract = atomicSwapContract(
    refundAddr.toJSON().hash,
    themAddr.toJSON().hash,
    lockTime,
    secretHash,
  );

  const contractP2SH = AddressUtil.NewAddressScriptHash(contract.toHex(), configuration.network);
  const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);

  const contractTx = new Transaction();
  let value = +(+amount * 100000000).toFixed(8); //todo use bignumber
  const output = Transaction.Output({
    script: contractP2SHPkScript,
    satoshis: value,
  });
  contractTx.addOutput(output);

  await fundTransaction(refundAddr, contractTx);

  //SIGN TRANSACTION
  const signitures = contractTx.getSignatures(privateKey);
  for (let signiture of signitures){
    contractTx.applySignature(signiture);
  }

  const contractTxHash = contractTx.hash;
  const contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount()

  const {refundFee, refundTx} = await buildRefund(contract.toHex(), contractTx.toString(), privateKey);

  return {
    contract,
    contractP2SH,
    contractP2SHPkScript,
    contractTxHash,
    contractTx,
    contractFee,
    refundTx,
    refundFee
  }
};
