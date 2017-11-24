import {SecretGenerator, SecretResult} from "../common/hashing";
import {BtcContractBuilder} from "./btc-contract-builder";
import {Util} from './util';
import {BtcTransaction} from './btc-transaction';

const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;
const Script = require('bitcore').Script;
const Buffer = require('buffer').Buffer;

import * as Hashing from '../common/hashing';

export class BtcAtomicSwap extends BtcTransaction {
    constructor(configuration: any) {
        super(configuration);
    }

    /**
     * Initiate contract
     * @param them
     * @param amount
     * @param privateKey
     * @returns {any}
     */
    public async initiate(them, amount, privateKey) {
        const secret: SecretResult = SecretGenerator.generateSecret();
        const lockTime = Util.getUnixTimeFor2Days();
        const b = await BtcContractBuilder.buildContract(this.configuration, them, amount, lockTime, secret.secretHash, privateKey);

        const rawTx = await this.publishTx(b.contractTx.toString());

        // console.log('Secret:              ', secret);
        // console.log('Secret hash:         ', secretHash);
        // console.log('Contract fee:        ', b.contractFee);
        // console.log('Refund fee:          ', b.refundFee);
        // console.log('\n');
        // console.log(
        //   'Contract:            ',
        //   '(' + b.contractP2SH.toString() + ')',
        // );
        // console.log(b.contract.toHex());
        // console.log('\n');
        // console.log('Contract transaction:', '(' + b.contractTxHash + ')');
        // console.log(b.contractTx.toString());
        // console.log('\n');
        // console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
        // console.log(b.refundTx.toString());
        // console.log('Published contract transaction: ', rawTx);
        return {
            ...secret,
            fee: b.contractFee,
            contract: b.contractP2SH.toString(),
            contractHex: b.contract.toHex(),
            contractTx: b.contractTx.hash,
            contractTxHex: b.contractTx.toString(),
            rawTx,
        };
    }

    /**
     * Participate to contract
     * @param them
     * @param amount
     * @param secretHash
     * @param privkey
     * @returns {any}
     */
    public async participate(them, amount, secretHash, privkey) {
        const lockTime = Util.getUnixTimeFor2Days();
        const b = await BtcContractBuilder.buildContract(this.configuration, them, amount, lockTime, secretHash, privkey);

        const rawTx = await this.publishTx(b.contractTx.toString());

        console.log('Secret hash:         ', secretHash);
        console.log('Contract fee:        ', b.contractFee);
        console.log('Refund fee:          ', '-- TODO --');
        console.log('\n');
        console.log(
          'Contract:            ',
          '(' + b.contractP2SH.toString() + ')',
        );
        console.log(b.contract.toHex());
        console.log('\n');
        console.log('Contract transaction:', '(' + b.contractTxHash + ')');
        console.log(b.contractTx.hex);
        console.log('\n');
        console.log('Refund transaction:  ', '(', b.refundTx.hash, ')');
        console.log(b.refundTx.toString());
        console.log('Published contract transaction: ', rawTx);
        return {
            fee: b.contractFee,
            contract: b.contractP2SH.toString(),
            contractHex: b.contract.toHex(),
            contractTx: b.contractTx.hash,
            contractTxHex: b.contractTx.toString(),
            rawTx
        };
    }

    /**
     * Redeem contract
     * @param strCt
     * @param strCtTx
     * @param secret
     * @param privateKey
     * @returns {Promise<{redeemTx: string; rawTx: any}>}
     */
    public async redeem(strCt, strCtTx, secret, privateKey) {

        // TODO: change strCt, strCtTx to ct, ctTx
        const contract = new Script(strCt);
        const pushes = BtcContractBuilder.extractAtomicSwapContract(strCt);

        if (!pushes) {
            console.log('contract is not an atomic swap script recognized by this tool');
            return;
        }

        const ctTx = new Transaction(strCtTx);

        const recipientAddrString = pushes.recipientHash.replace('0x', '');
        const recipientAddress = Util.NewAddressPubKeyHash(recipientAddrString, 'testnet');
        const contractP2SH = Util.NewAddressScriptHash(strCt, this.configuration.network);

        let ctTxOutIdx = -1;

        for (let i = 0; i < ctTx.outputs.length; i++) {
            const scr = new Script(ctTx.outputs[i].script);
            const address = scr.toAddress(this.configuration.network);
            const addressHash = address.toJSON().hash;

            if (addressHash === contractP2SH.toJSON().hash) {
                ctTxOutIdx = i;
                break;
            }
        }

        if (ctTxOutIdx === -1) {
            console.log('transaction does not contain a contract output');
            return;
        }

        const PK = PrivateKey.fromWIF(privateKey);
        const newRawAddr = PK.toPublicKey().toAddress(this.configuration.network);
        const redeemToAddr = new Address(newRawAddr);

        // TODO:  "getrawchangeaddres" + erroe await getChangeAddress()
        // TODO: pass redeemToAddr as parametar
        // const redeemToAddr = new Address('moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq');

        const outScript = Script.buildPublicKeyHashOut(redeemToAddr);

        // https://bitcoin.org/en/developer-examples#offline-signing
        const redeemTx = new Transaction();

        // TODO: "redeem output value of %v is dust"
        let output = Transaction.Output({
            script: outScript,
            satoshis: 0,
        });

        redeemTx.addOutput(output);

        const feePerKb = await this.getFeePerKb();
        const redeemSerializeSize = Util.EstimateRedeemSerializeSize(contract, redeemTx.outputs);

        const fee = Util.FeeForSerializeSize(feePerKb, redeemSerializeSize) * 100000000;

        const amount = ctTx.outputs[ctTxOutIdx].satoshis - fee;

        output = Transaction.Output({
            script: outScript,
            satoshis: amount
        });

        redeemTx.removeOutput(0);
        redeemTx.addOutput(output);

        const input = Transaction.Input({
            prevTxId: ctTx.id,
            outputIndex: ctTxOutIdx,
            script: new Script(ctTx.outputs[ctTxOutIdx].script)
        });

        redeemTx.uncheckedAddInput(input);

        const inputIndex = 0;
        const {sig, pubKey} = await BtcContractBuilder.createSig(redeemTx, inputIndex, contract, recipientAddress, privateKey);
        const script = BtcContractBuilder.redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);
        redeemTx.inputs[0].setScript(script);

        let res;
        try {
            res = await this.publishTx(redeemTx.toString());

        } catch (e) {
            console.log(e);
        }

        return {
            redeemTx: redeemTx.toString(),
            rawTx: res,
        };
    }

    /**
     * Audit contract
     * @param ct
     * @param tx
     * @returns {any}
     */
    public async auditContract(ct, tx) {
        const contract = new Script(ct);
        const contractScriptHashOut = contract.toScriptHashOut();
        const contractAddress = contractScriptHashOut.toAddress();
        const contractAddressString = contractAddress.toJSON().hash;

        const transaction = new Transaction(tx);

        const hasTxOut = transaction.toJSON().outputs.find((output => {
            const script = new Script(output.script);
            const address = script.toAddress(this.configuration.network);
            const addressHash = address.toJSON().hash;
            return addressHash === contractAddressString;
        }));

        if (!hasTxOut) {
            console.error('transaction does not contain the secret');
            return;
        }

        const pushes = BtcContractBuilder.extractAtomicSwapContract(ct);

        const recipientAddrString = pushes.recipientHash.replace('0x', '');
        const recipientAddress = Util.NewAddressPubKeyHash(recipientAddrString, this.configuration.network);

        const refundAddressString = pushes.refundHash160.replace('0x', '');
        const refundAddress = Util.NewAddressPubKeyHash(refundAddressString, this.configuration.network);

        const contractSH = Util.NewAddressScriptHash(ct, this.configuration.network).toString();
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
            lockTime: new Date(pushes.lockTime * 1000), // TODO reverse the staff from buildCOntract ^^
        };
    }

    /**
     * Extract secret
     * @param redemptionTx
     * @param secretHash
     * @returns {any}
     */
    public extractSecret(redemptionTx, secretHash) {
        const transaction = new Transaction(redemptionTx);
        const txData = Util.flatMap(
          transaction.toJSON().inputs.map(input => {
              const script = new Script(input.scriptString);
              const pops = script.toString().split(' ');
              const data = pops.filter(opcode => opcode.indexOf('0x') !== -1).map(opdata => opdata.replace('0x', ''));
              return data;
          }),
        );
        const secret = txData.find(sc => {
            return new Hashing.Ripemd160().buffer(Buffer.from(sc, 'hex')) === secretHash;
        });
        return secret;
    }
}
