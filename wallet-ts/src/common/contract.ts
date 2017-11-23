import {Util} from './util';
import {BtcTransaction} from './transaction';

const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;
const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer').Buffer;

export class Contract {

    configuration: any;
    constructor(configuration: any) {
        this.configuration = configuration;
    }
    /**
     * Build contract
     * @param them
     * @param amount
     * @param lockTime
     * @param secretHash
     * @param privateKey
     * @returns {Promise<{contract: any; contractP2SH: any; contractP2SHPkScript: any; contractTxHash: any; contractTx: any; contractFee: number; refundTx: any; refundFee: any}>}
     */
    async buildContract(them, amount, lockTime, secretHash, privateKey) {
        const PK = PrivateKey.fromWIF(privateKey);
        const refundAddr = PK.toPublicKey().toAddress(this.configuration.network);

        const themAddr = new Address(them);

        const contract = this.atomicSwapContract(
            refundAddr.toJSON().hash,
            themAddr.toJSON().hash,
            lockTime,
            secretHash,
        );

        const contractP2SH = Util.NewAddressScriptHash(contract.toHex(), this.configuration.network);
        const contractP2SHPkScript = Script.buildScriptHashOut(contractP2SH);

        const contractTx = new Transaction();
        const value = Math.round(amount * 100000000);
        // console.log(value);
        const output = Transaction.Output({
            script: contractP2SHPkScript,
            satoshis: value,
        });
        contractTx.addOutput(output);

        const transaction: BtcTransaction = new BtcTransaction(this.configuration);

        await transaction.fundTransaction(refundAddr, contractTx);

        // SIGN TRANSACTION
        const signatures = contractTx.getSignatures(privateKey);
        for (const signature of signatures) {
            contractTx.applySignature(signature);
        }

        const contractTxHash = contractTx.hash;
        const contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount()

        const {refundFee, refundTx} = await transaction.buildRefund(contract.toHex(), contractTx.toString(), privateKey);

        return {
            contract,
            contractP2SH,
            contractP2SHPkScript,
            contractTxHash,
            contractTx,
            contractFee,
            refundTx,
            refundFee
        };
    }

    /**
     * Build atomic swap
     * @param refundAddress
     * @param pkhThem
     * @param lockTime
     * @param secretHash
     * @returns {any}
     */
    atomicSwapContract(refundAddress, pkhThem, lockTime, secretHash) {
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
}
