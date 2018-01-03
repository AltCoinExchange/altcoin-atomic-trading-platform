import axios from "axios";
import * as bitcore from "bitcore";
import * as Mnemonic from "bitcore-mnemonic";
import {BtcAtomicSwap} from "./btc-atomic-swap";
import {FreshBitcoinWallet} from "./fresh-btc";
import {RegenerateBitcoinWallet} from "./regenerate-btc";
import {BtcRpcConfiguration} from "../config/config";
import {BtcConfiguration} from "../config/config-btc";

const HDPrivateKey = bitcore.HDPrivateKey;
const PrivateKey = bitcore.PrivateKey;

export class BitcoinWallet extends BtcAtomicSwap {
    public code: any;
    public hierarchicalPrivateKey: any;
    public btcConfiguration: any;
    public btcRpcConfiguration: any;

    constructor(net = "testnet") {
        super(net);
        if (net === "testnet") {
            this.btcConfiguration = BtcConfiguration;
            this.btcRpcConfiguration = BtcRpcConfiguration;
        } else if (net === "mainnet") {
            // TODO
        }
    }

    get hdPrivateKey(): any {
        return this.hierarchicalPrivateKey;
    }

    public get WIF(): string {
        return this.hierarchicalPrivateKey.privateKey.toWIF();
    }

    public async getbalance(address: string): Promise<any> {
        return await axios.get("https://chain.so/api/v2/get_address_balance/BTCTEST/" + address).then((balance) => {
            return balance.data.data.confirmed_balance;
        });
    }

    public recover(params: RegenerateBitcoinWallet) {
        this.hierarchicalPrivateKey = new HDPrivateKey(params.code);
    }

    public create(params: FreshBitcoinWallet) {
        const valid = Mnemonic.isValid(params.code);
        if (!valid) {
            throw Error("Not valid mnemonic code");
        }

        this.code = new Mnemonic(params.code);
        this.generateHDPrivateKey(params.password);
    }

    public generateAddressFromWif(wif?: string): string {
        if (!wif) {
            wif = this.WIF;
        }
        const WIF = new PrivateKey(wif);
        return WIF.toPublicKey().toAddress(this.btcConfiguration.network).toString();
    }

    private generateHDPrivateKey(passPhrase): void {
        // tslint:disable-next-line
        console.log(passPhrase);
        this.hierarchicalPrivateKey = this.code.toHDPrivateKey(passPhrase, this.btcRpcConfiguration.network);
    }
}
