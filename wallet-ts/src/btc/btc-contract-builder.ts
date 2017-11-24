import {BtcAtomicSwapData} from "./atomic-swap";
import {BtcTransaction} from "./btc-transaction";
import {Util} from "./util";
const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;
const BufferReader = require('bitcore').encoding.BufferReader;
const axios = require('axios');

export class BtcContractBuilder {

    /**
     * Get atomic swap contract
     * @param ct
     * @returns {any}
     */
    public static extractAtomicSwapContract(ct: any): BtcAtomicSwapData {
        const contract = new Script(ct);
        const pops = contract.toString().split(" ");
        const opCodes = pops.filter(opcode => opcode.indexOf("0x") === -1);

        const isAtomicSwap =
          (new Opcode(opCodes[0]).toString() === new Opcode(Opcode.OP_IF).toString()) &&
          (new Opcode(opCodes[1]).toString() === new Opcode(Opcode.OP_RIPEMD160).toString()) &&
          (parseInt(opCodes[2]) === 20) &&
          (new Opcode(opCodes[3]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
          (new Opcode(opCodes[4]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
          (new Opcode(opCodes[5]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
          (parseInt(opCodes[6]) === 20) &&
          (new Opcode(opCodes[7]).toString() === new Opcode(Opcode.OP_ELSE).toString()) &&
          (parseInt(opCodes[8])) &&
          (new Opcode(opCodes[9]).toString() === new Opcode(Opcode.OP_CHECKLOCKTIMEVERIFY).toString()) &&
          (new Opcode(opCodes[10]).toString() === new Opcode(Opcode.OP_DROP).toString()) &&
          (new Opcode(opCodes[11]).toString() === new Opcode(Opcode.OP_DUP).toString()) &&
          (new Opcode(opCodes[12]).toString() === new Opcode(Opcode.OP_HASH160).toString()) &&
          (parseInt(opCodes[13]) === 20) &&
          (new Opcode(opCodes[14]).toString() === new Opcode(Opcode.OP_ENDIF).toString()) &&
          (new Opcode(opCodes[15]).toString() === new Opcode(Opcode.OP_EQUALVERIFY).toString()) &&
          (new Opcode(opCodes[16]).toString() === new Opcode(Opcode.OP_CHECKSIG).toString());

        if (!isAtomicSwap) {
            console.error("contract is not an atomic swap script!");
            return;
        }

        const data = pops.filter(opcode => opcode.indexOf("0x") !== -1);

        const secretHash = data[0];
        const recipientHash = data[1];
        const lockTime = data[2].replace("0x", "");
        const refundHash160 = data[3];

        return new BtcAtomicSwapData(secretHash, recipientHash, lockTime, refundHash160);
    }

    /**
     * Build atomic swap
     * @param refundAddress
     * @param pkhThem
     * @param lockTime
     * @param secretHash
     * @returns {any}
     */
    public static atomicSwapContract(refundAddress, pkhThem, lockTime, secretHash) {
        const conv = num => {
            const b = new ArrayBuffer(4);
            new DataView(b).setUint32(0, num);
            return Array.from(new Uint32Array(b));
        };

        const decimalToHexString = (number) => {
            if (number < 0) {
                number = 0xFFFFFFFF + number + 1;
            }

            return number.toString(16).toUpperCase();
        };

        const script = new Script();
        script.add(Opcode.OP_IF);
        script.add(Opcode.OP_RIPEMD160);
        script.add(new Buffer(secretHash, 'hex'));
        script.add(Opcode.OP_EQUALVERIFY);
        script.add(Opcode.OP_DUP);
        script.add(Opcode.OP_HASH160);
        script.add(new Buffer(pkhThem, 'hex'));

        script.add(Opcode.OP_ELSE);
        script.add(new Buffer(decimalToHexString(conv(lockTime)[0]), 'hex'));
        script.add('OP_CHECKLOCKTIMEVERIFY');
        script.add(Opcode.OP_DROP);
        script.add(Opcode.OP_DUP);
        script.add(Opcode.OP_HASH160);
        script.add(new Buffer(refundAddress, 'hex'));

        script.add(Opcode.OP_ENDIF);

        script.add(Opcode.OP_EQUALVERIFY);
        script.add(Opcode.OP_CHECKSIG);
        return script;
    }

    /**
     * Create redeem contract
     * @param contract
     * @param sig
     * @param pubkey
     * @param secret
     * @returns {any}
     */
    public static redeemP2SHContract(contract, sig, pubkey, secret) {
        const script = new Script();
        script.add(sig);
        script.add(new Buffer(pubkey, 'hex'));
        script.add(new Buffer(secret, 'hex'));
        script.add(Opcode.OP_1);
        script.add(new Buffer(contract, 'hex'));

        // script.add(new Buffer(secret, 'hex'));
        // script.add(Buffer.from(secret, "hex"));

        return script;
    }

    /**
     * Refund Script Contract
     * @param contract
     * @param sig
     * @param pubkey
     * @param secret
     * @returns {any}
     */
    public static refundP2SHContract(contract, sig, pubkey, secret) {
        const script = new Script();
        // script.add(sig);
        script.add(new Buffer(sig));
        script.add(new Buffer(pubkey, 'hex'));
        script.add(Opcode.OP_0);
        script.add(new Buffer(contract, 'hex'));

        // script.add(new Buffer(secret, 'hex'));
        // script.add(Buffer.from(secret, "hex"));

        return script;
    }

    /**
     * Build contract
     * @param them
     * @param amount
     * @param lockTime
     * @param secretHash
     * @param privateKey
     * @returns {any}
     */
    public static async buildContract(config, them, amount, lockTime, secretHash, privateKey) {
        const PK = PrivateKey.fromWIF(privateKey);
        const refundAddr = PK.toPublicKey().toAddress(config);

        const themAddr = new Address(them);

        const contract = BtcContractBuilder.atomicSwapContract(
          refundAddr.toJSON().hash,
          themAddr.toJSON().hash,
          lockTime,
          secretHash,
        );

        const contractP2SH = Util.NewAddressScriptHash(contract.toHex(), config.network);
        const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);

        const contractTx = new Transaction();
        const value = Math.round(amount * 100000000);
        // console.log(value);
        const output = Transaction.Output({
            script: contractP2SHPkScript,
            satoshis: value,
        });
        contractTx.addOutput(output);

        const transaction: BtcTransaction = new BtcTransaction(config);
        await transaction.fundTransaction(refundAddr, contractTx);

        // SIGN TRANSACTION
        const signatures = contractTx.getSignatures(privateKey);
        for (const signature of signatures) {
            contractTx.applySignature(signature);
        }

        const contractTxHash = contractTx.hash;
        const contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();

        const {refundFee, refundTx} = await BtcContractBuilder.buildRefund(config, contract.toHex(), contractTx.toString(), privateKey);

        return {
            contract,
            contractP2SH,
            contractP2SHPkScript,
            contractTxHash,
            contractTx,
            contractFee,
            refundTx,
            refundFee,
        };
    }

    /**
     * Create signature
     * @param reedemTx
     * @param inputIndex
     * @param contract
     * @param recipientAddress
     * @param privateKey
     * @returns {{sig: any; pubKey: any}}
     */
    public static createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
        const wif = privateKey;
        const WIF = new PrivateKey(wif);
        const sighashType = 1;
        const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract);
        const pubKey = WIF.toPublicKey();
        return {sig, pubKey};
    }

    /**
     * Build refund
     * @param strCt
     * @param strCtTx
     * @param privateKey
     * @returns {Promise<{refundFee: number; refundTx: any}>}
     */
    public static async buildRefund(config, strCt, strCtTx, privateKey) {
        console.log('buildRefund');

        // TODO: change strCt, strCtTx to ct, ctTx
        const contract = new Script(strCt);
        const pushes = BtcContractBuilder.extractAtomicSwapContract(strCt);

        if (!pushes) {
            console.log('contract is not an atomic swap script recognized by this tool');
            return;
        }

        const ctTx = new Transaction(strCtTx);

        const refundAddrString = pushes.refundHash160.replace('0x', '');
        const refundAddress = Util.NewAddressPubKeyHash(refundAddrString, 'testnet');
        const contractP2SH = Util.NewAddressScriptHash(strCt, config.network);

        let ctTxOutIdx = -1;

        for (let i = 0; i < ctTx.outputs.length; i++) {
            const scr = new Script(ctTx.outputs[i].script);
            const address = scr.toAddress(config.network);
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

        // TODO:  "getrawchangeaddres" TODO Check?
        const transaction: BtcTransaction = new BtcTransaction(config);
        const addr = new Address(await transaction.getChangeAddress());
        // const addr = 'mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ';
        const outScript = Script.buildPublicKeyHashOut(addr);

        // https://bitcoin.org/en/developer-examples#offline-signing
        const refundTx = new Transaction();
        const lockTime = new BufferReader(pushes.lockTime).readUInt32LE();
        refundTx.lockUntilDate(lockTime);

        // TODO: "refund output value of %v is dust"
        let output = Transaction.Output({
            script: outScript,
            satoshis: 0,
        });

        refundTx.addOutput(output);
        const feePerKb = await transaction.getFeePerKb();
        console.log('Fee per kb:', feePerKb);
        const redeemSerializeSize = Util.EstimateRefundSerializeSize(contract, refundTx.outputs);
        const refundFee = Util.FeeForSerializeSize(feePerKb, redeemSerializeSize) * 100000000;

        const amount = ctTx.outputs[ctTxOutIdx].satoshis - refundFee;

        output = Transaction.Output({
            script: outScript,
            satoshis: amount,
        });

        refundTx.removeOutput(0);
        refundTx.addOutput(output);

        const input = Transaction.Input({
            prevTxId: ctTx.id,
            outputIndex: ctTxOutIdx,
            sequenceNumber: 0,
            script: new Script(ctTx.outputs[ctTxOutIdx].script),
        });

        refundTx.uncheckedAddInput(input);

        const inputIndex = 0;
        const {sig, pubKey} = await BtcContractBuilder.createSig(refundTx, inputIndex, contract, refundAddress, privateKey);

        // TODO: Check
        const script = this.refundP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), '');

        refundTx.inputs[0].setScript(script);

        return {
            refundFee,
            refundTx,
        };
    }
}
