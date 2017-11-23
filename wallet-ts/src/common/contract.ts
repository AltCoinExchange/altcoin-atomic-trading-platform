import {SecretGenerator, SecretResult} from "./hashing";
import {Util} from './util';
import {BtcTransaction} from './transaction';

const axios = require('axios');
const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;
const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer').Buffer;
const BufferReader = require('bitcore').encoding.BufferReader;
import * as Hashing from './hashing';

// TODO: Heavily refactor and optimize
export class Contract extends BtcTransaction {
    constructor(configuration: any) {
        super(configuration);
    }

    /**
     * Flatten map
     * @param arr
     */
    private flatMap(arr) {
        return arr.reduce((a, b) => {
            return a.concat(b);
        }, []);
    }

    /**
     * Create redeem contract
     * @param contract
     * @param sig
     * @param pubkey
     * @param secret
     * @returns {any}
     */
    private redeemP2SHContract(contract, sig, pubkey, secret) {
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
     * Get atomic swap contract
     * @param ct
     * @returns {any}
     */
    private extractAtomicSwapContract(ct: any) {
        const contract = new Script(ct);
        const pops = contract.toString().split(' ');
        const opCodes = pops.filter(opcode => opcode.indexOf('0x') === -1);

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
            console.error('contract is not an atomic swap script!');
            return;
        }

        const data = pops.filter(opcode => opcode.indexOf('0x') !== -1);

        const secretHash = data[0];
        const recipientHash = data[1];
        const lockTime = data[2].replace('0x', '');
        const refundHash160 = data[3];

        return {
            secretHash,
            recipientHash,
            lockTime,
            refundHash160,
        };
    }

    /**
     * Call RPC generic procedure with parameters
     * @param {string} method
     * @param {any[]} params
     * @returns {Promise<any>}
     */
    private async callRPCProc(method: string, params: any[]) {
        return await axios.post(
          this.configuration.url,
          {
              "rpcuser": this.configuration.user,
              "rpcpassword": this.configuration.pass,
              "method": "estimatesmartfee",
              "params": params,
          },
          {
              auth: {
                  username: this.configuration.user,
                  password: this.configuration.pass,
              },
          },
        );
    }

    /**
     * Get fee per Kb
     * @returns {Promise<any>}
     */
    private async getFeePerKb() {
        const estimateRawResp = await this.callRPCProc('estimatesmartfee', [6]);
        return estimateRawResp.data.result.feerate;
    }

    /**
     * Refund Script Contract
     * @param contract
     * @param sig
     * @param pubkey
     * @param secret
     * @returns {any}
     */
    private refundP2SHContract(contract, sig, pubkey, secret) {
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
    public async buildContract(them, amount, lockTime, secretHash, privateKey) {
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
        const contractFee = contractTx._getInputAmount() - contractTx._getOutputAmount();

        const {refundFee, refundTx} = await this.buildRefund(contract.toHex(), contractTx.toString(), privateKey);

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
     * Initiate contract
     * @param them
     * @param amount
     * @param privateKey
     * @returns {any}
     */
    public async initiate(them, amount, privateKey) {
        const secret: SecretResult = SecretGenerator.generateSecret();
        const lockTime = Util.getUnixTimeFor2Days();
        const b = await this.buildContract(them, amount, lockTime, secret.secretHash, privateKey);

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
        const b = await this.buildContract(them, amount, lockTime, secretHash, privkey);

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
        const pushes = this.extractAtomicSwapContract(strCt);

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
        // const addr = new Address(newRawAddr);

        // TODO:  "getrawchangeaddres" + erroe await getChangeAddress()
        // TODO: pass redeemToAddr as parametar
        const redeemToAddr = new Address('moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq');

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


        const inputIndex = 0
        const {sig, pubKey} = await this.createSig(redeemTx, inputIndex, contract, recipientAddress, privateKey);
        const script = this.redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), secret);
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

        const pushes = this.extractAtomicSwapContract(ct);

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
    };

    public extractSecret(redemptionTx, secretHash) {
        const transaction = new Transaction(redemptionTx);
        const txData = this.flatMap(
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

    /**
     * Create signature
     * @param reedemTx
     * @param inputIndex
     * @param contract
     * @param recipientAddress
     * @param privateKey
     * @returns {{sig: any; pubKey: any}}
     */
    public createSig(reedemTx, inputIndex, contract, recipientAddress, privateKey) {
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
    public async buildRefund(strCt, strCtTx, privateKey) {
        console.log('buildRefund');

        // TODO: change strCt, strCtTx to ct, ctTx
        const contract = new Script(strCt);
        const pushes = this.extractAtomicSwapContract(strCt);

        if (!pushes) {
            console.log('contract is not an atomic swap script recognized by this tool');
            return;
        }

        const ctTx = new Transaction(strCtTx);

        const refundAddrString = pushes.refundHash160.replace('0x', '');
        const refundAddress = Util.NewAddressPubKeyHash(refundAddrString, 'testnet');
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

        // TODO:  "getrawchangeaddres" WTF?
        // const addr = new Address(await getChangeAddress())
        const addr = 'mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ';
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
        const feePerKb = await this.getFeePerKb();
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
        const {sig, pubKey} = await this.createSig(refundTx, inputIndex, contract, refundAddress, privateKey);

        // TODO: Check
        const script = this.refundP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), '');

        refundTx.inputs[0].setScript(script);

        return {
            refundFee,
            refundTx,
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
    public atomicSwapContract(refundAddress, pkhThem, lockTime, secretHash) {
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
