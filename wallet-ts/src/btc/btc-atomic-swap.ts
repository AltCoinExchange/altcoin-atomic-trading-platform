import {IAtomicSwap} from "../atomic-swap";
import {SecretGenerator, SecretResult} from "../common/hashing";
import {
    BtcExtractSecretData,
    BtcExtractSecretParams,
    BtcInitiateData, BtcInitiateParams, BtcParticipateData, BtcParticipateParams,
    BtcRedeemData, BtcRedeemParams, BtcRefundData, BtcRefundParams,
} from "./atomic-swap";
import {BtcAuditContractData} from "./atomic-swap/btc-audit-contract-data";
import {BtcContractBuilder} from "./btc-contract-builder";
import {Util} from './util';
import {BtcTransaction} from './btc-transaction';

const Transaction = require('bitcore').Transaction;
const Address = require('bitcore').Address;
const PrivateKey = require('bitcore').PrivateKey;
const Script = require('bitcore').Script;
const Buffer = require('buffer').Buffer;

import * as Hashing from '../common/hashing';

export class BtcAtomicSwap extends BtcTransaction implements IAtomicSwap {

    constructor(configuration: any) {
        super(configuration);
    }

    /**
     * Initiate atomic swap
     * @param {BtcInitiateParams} params
     * @returns {Promise<BtcInitiateData>}
     */
    public async initiate(params: BtcInitiateParams): Promise<BtcInitiateData> {
        const secret: SecretResult = SecretGenerator.generateSecret();
        const lockTime = Util.getUnixTimeFor2Days();
        const b = await BtcContractBuilder.buildContract(this.configuration, params.address, params.amount,
          lockTime, secret.secretHash, params.privKey /* Private key*/);
        const rawTx = await this.publishTx(b.contractTx.toString());

        return new BtcInitiateData(b.contractFee, b.contractP2SH.toString(), b.contract.toHex(), b.contractTx.hash,
          b.contractTx.toString(), rawTx, secret.secret, secret.secretHash);
    }

    /**
     * Participate atomic swap
     * @param {BtcParticipateParams} params
     * @returns {Promise<BtcParticipateData>}
     */
    public async participate(params: BtcParticipateParams): Promise<BtcParticipateData> {
        const lockTime = Util.getUnixTimeFor2Days();
        const b = await BtcContractBuilder.buildContract(this.configuration, params.address, params.amount,
          lockTime, params.secret, params.privateKey);

        const rawTx = await this.publishTx(b.contractTx.toString());

        return new BtcParticipateData(b.contractFee, b.contractP2SH.toString(),
          b.contract.toHex(), b.contractTx.hash, b.contractTx.toString(), rawTx);
    }

    /**
     * Redeem atomic swap
     * @param {BtcRedeemParams} params
     * @returns {Promise<BtcRedeemData>}
     */
    public async redeem(params: BtcRedeemParams): Promise<BtcRedeemData> {
        // TODO: change strCt, strCtTx to ct, ctTx
        const contract = new Script(params.contractBin);
        const pushes = BtcContractBuilder.extractAtomicSwapContract(params.contractBin);

        if (!pushes) {
            console.log('contract is not an atomic swap script recognized by this tool');
            return;
        }

        const ctTx = new Transaction(params.contractTx);

        const recipientAddrString = pushes.recipientHash.replace('0x', '');
        const recipientAddress = Util.NewAddressPubKeyHash(recipientAddrString, 'testnet');
        const contractP2SH = Util.NewAddressScriptHash(params.contractBin, this.configuration.network);

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

        const PK = PrivateKey.fromWIF(params.secret);
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
        const {sig, pubKey} = await BtcContractBuilder.createSig(redeemTx, inputIndex, contract, recipientAddress, params.secret);
        const script = BtcContractBuilder.redeemP2SHContract(contract.toHex(), sig.toTxFormat(), pubKey.toString(), params.hashedSecret);
        redeemTx.inputs[0].setScript(script);

        const res = await this.publishTx(redeemTx.toString());

        return new BtcRedeemData(redeemTx.toString(), res);
    }

    /**
     * Extract secret
     * @param {BtcExtractSecretParams} extractSecretParams
     * @returns {Promise<BtcExtractSecretData>}
     */
    public async extractSecret(extractSecretParams: BtcExtractSecretParams): Promise<BtcExtractSecretData> {
        const transaction = new Transaction(extractSecretParams.redemptionTx);
        const txData = Util.flatMap(
          transaction.toJSON().inputs.map(input => {
              const script = new Script(input.scriptString);
              const pops = script.toString().split(' ');
              const data = pops.filter(opcode => opcode.indexOf('0x') !== -1).map(opdata => opdata.replace('0x', ''));
              return data;
          }),
        );
        const secret = txData.find(sc => {
            return new Hashing.Ripemd160().buffer(Buffer.from(sc, 'hex')) === extractSecretParams.hashedSecret;
        });
        return secret;
    }

    refund(refundParams: BtcRefundParams): Promise<BtcRefundData> {
        return undefined;
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

        return new BtcAuditContractData(contractSH, contractValue, recipientAddress.toString(),
            refundAddress.toString(), pushes.secretHash.replace('0x', ''), new Date(pushes.lockTime * 1000));
    }
}
