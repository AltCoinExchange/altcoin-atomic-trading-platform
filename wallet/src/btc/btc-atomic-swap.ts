import * as bitcore from "bitcore";
import {IAtomicSwap} from "../atomic-swap";
import * as Hashing from "../common/hashing";
import {SecretGenerator, SecretResult} from "../common/hashing";
import {
    BtcExtractSecretData,
    BtcExtractSecretParams,
    BtcInitiateData,
    BtcInitiateParams,
    BtcParticipateData,
    BtcParticipateParams,
    BtcRedeemData,
    BtcRedeemParams,
    BtcRefundData,
    BtcRefundParams,
} from "./atomic-swap";
import {BtcAuditContractData} from "./atomic-swap/btc-audit-contract-data";
import {BtcContractBuilder} from "./btc-contract-builder";
import {BtcTransaction} from "./btc-transaction";
import {Util} from "./util";
import {BtcRpcConfiguration} from "../config/config";

const Transaction = bitcore.Transaction;
const Address = bitcore.Address;
const PrivateKey = bitcore.PrivateKey;
const Script = bitcore.Script;
const Buffer = bitcore.Buffer;

export class BtcAtomicSwap extends BtcTransaction implements IAtomicSwap {

    private retryTimeout = 10000;

    constructor(net) {
        super(net);
        if (net === "testnet") {
            this.configuration = BtcRpcConfiguration;
        } else if (net === "mainnet") {
            // TODO
        }
    }

    /**
     * Initiate atomic swap
     * @param {BtcInitiateParams} params
     * @returns {Promise<BtcInitiateData>}
     */
    public async initiate(params: BtcInitiateParams): Promise<BtcInitiateData> {

        try {
            const secret: SecretResult = SecretGenerator.generateSecret();
            const lockTime = Util.getUnixTimeFor2Days();
            // tslint:disable-next-line
            console.log("BTC INITIATE, BUILDING CONTRACT...");
            const b = await this.buildContract(params.address, params.amount,
                lockTime, secret.secretHash, params.privKey);
            // tslint:disable-next-line
            console.log("CONTRACT BUILT, PUBLISHING TRANSACTION..");
            const rawTx = await this.publishTx(b.contractTx.toString());
            // tslint:disable-next-line
            console.log("TRANSACTION PUBLISHED, RETURNING..");
            return new BtcInitiateData(b.contractFee, b.contractP2SH.toString(), b.contract.toHex(), b.contractTx.hash,
                b.contractTx.toString(), rawTx, secret.secret, secret.secretHash);
        } catch (e) {
            // tslint:disable-next-line
            console.log("ERROR INVOKING INITIATE: ", params, e);
            await this.wait(this.retryTimeout);
            return await this.initiate(params);
        }
    }

    /**
     * Participate atomic swap
     * @param {BtcParticipateParams} params
     * @returns {Promise<BtcParticipateData>}
     */
    public async participate(params: BtcParticipateParams): Promise<BtcParticipateData> {
        try {
            const lockTime = Util.getUnixTimeFor2Days();
            const b = await this.buildContract(params.address, params.amount,
                lockTime, params.secretHash, params.privateKey);

            const rawTx = await this.publishTx(b.contractTx.toString());

            return new BtcParticipateData(b.contractFee, b.contractP2SH.toString(),
                b.contract.toHex(), b.contractTx.hash, b.contractTx.toString(), rawTx);
        } catch (e) {
            // tslint:disable-next-line
            console.log("ERROR INVOKING PARTICIPATE: ", params, e);
            await this.wait(this.retryTimeout);
            return await this.participate(params);
        }
    }

    /**
     * Redeem atomic swap
     * @param {BtcRedeemParams} params
     * @returns {Promise<BtcRedeemData>}
     */
    public async redeem(params: BtcRedeemParams): Promise<BtcRedeemData> {

        try {
            // TODO: change strCt, strCtTx to ct, ctTx
            const contract = new Script(params.contractBin);
            const pushes = BtcContractBuilder.extractAtomicSwapContract(params.contractBin);

            // tslint:disable-next-line
            console.log("BTC REDEEM PARAMS: ", params);

            if (!pushes) {
                throw new Error("contract is not an atomic swap script recognized by this tool");
            }

            const ctTx = new Transaction(params.contractTx);

            const recipientAddrString = pushes.recipientHash.replace("0x", "");
            const recipientAddress = Util.NewAddressPubKeyHash(recipientAddrString, "testnet");
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
                return;
            }

            const PK = PrivateKey.fromWIF(params.privKey);
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
                satoshis: Math.round(amount),
            });

            redeemTx.removeOutput(0);
            redeemTx.addOutput(output);

            const input = Transaction.Input({
                prevTxId: ctTx.id,
                outputIndex: ctTxOutIdx,
                script: new Script(ctTx.outputs[ctTxOutIdx].script),
            });

            redeemTx.uncheckedAddInput(input);

            const inputIndex = 0;
            const {sig, pubKey} = await BtcContractBuilder.createSig(redeemTx, inputIndex, contract,
                recipientAddress, params.privKey);

            const script = BtcContractBuilder.redeemP2SHContract(contract.toHex(), sig.toTxFormat(),
                pubKey.toString(), params.secret);

            redeemTx.inputs[0].setScript(script);
            let res: any = null;

            try {
                res = await this.publishTx(redeemTx.toString());
            } catch (e) {
                throw e;
            }

            return new BtcRedeemData(params.secret, params.hashedSecret, redeemTx.toString(), res);
        } catch (e) {
            // tslint:disable-next-line
            console.log("ERROR INVOKING REDEEM: ", params, e);
            await this.wait(this.retryTimeout);
            return await this.redeem(params);
        }
    }

    /**
     * Extract secret
     * @param {BtcExtractSecretParams} extractSecretParams
     * @returns {Promise<BtcExtractSecretData>}
     */
    public async extractSecret(extractSecretParams: BtcExtractSecretParams): Promise<BtcExtractSecretData> {
        const transaction = new Transaction(extractSecretParams.redemptionTx);
        const txData = Util.flatMap(
            transaction.toJSON().inputs.map((input) => {
                const script = new Script(input.scriptString);
                const pops = script.toString().split(" ");
                const data = pops.filter((opcode) => opcode.indexOf("0x") !== -1)
                    .map((opdata) => opdata.replace("0x", ""));
                return data;
            }),
        );
        const secret = txData.find((sc) => {
            return new Hashing.Ripemd160().buffer(Buffer.from(sc, "hex")) === extractSecretParams.hashedSecret;
        });
        return secret;
    }

    public refund(refundParams: BtcRefundParams): Promise<BtcRefundData> {
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

        const hasTxOut = transaction.toJSON().outputs.find(((output) => {
            const script = new Script(output.script);
            const address = script.toAddress(this.configuration.network);
            const addressHash = address.toJSON().hash;
            return addressHash === contractAddressString;
        }));

        if (!hasTxOut) {
            throw new Error("transaction does not contain the secret");
        }

        const pushes = BtcContractBuilder.extractAtomicSwapContract(ct);

        const recipientAddrString = pushes.recipientHash.replace("0x", "");
        const recipientAddress = Util.NewAddressPubKeyHash(recipientAddrString, this.configuration.network);

        const refundAddressString = pushes.refundHash160.replace("0x", "");
        const refundAddress = Util.NewAddressPubKeyHash(refundAddressString, this.configuration.network);

        const contractSH = Util.NewAddressScriptHash(ct, this.configuration.network).toString();
        const contractValue = hasTxOut.satoshis / 100000000 + " BTC";

        return new BtcAuditContractData(contractSH, contractValue, recipientAddress.toString(),
            refundAddress.toString(), pushes.secretHash.replace("0x", ""), new Date(pushes.lockTime * 1000));
    }

    private async wait(ms: number) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                resolve(true);
            }, ms);
        });
    }
}
