import * as Web3 from "web3/src";
import {Contract} from "web3/types";
import {IEthAccount} from "./eth-account";
import axios from "axios";
import * as bitcore from "bitcore";
const HDPrivateKey = bitcore.HDPrivateKey;

const walletN = 256;

export enum EthConfirmation {
    RECEIPT = 0,
    CONFIRMATION = 1,
    STATIC = 2,
}

export class EthEngine {
    protected web3: any;
    private contract: Contract;
    private maxThreads = 20;
    private firstBlockNumber = 1909000;

    constructor(private abiConfiguration, public configuration, private bin) {
        const wsProvider = new Web3.providers.WebsocketProvider(configuration.wshost);
        this.web3 = new Web3(wsProvider);
        this.web3.defaultAccount = configuration.defaultWallet;

        if (abiConfiguration) {
            this.contract = new this.web3.eth.Contract(abiConfiguration, configuration.contractAddress);
        }
    }

    public isListening() {
        return this.web3.currentProvider.connection.readyState === 0 ||
            this.web3.currentProvider.connection.readyState === 1;
    }

    public createAccount(password): IEthAccount {
        const accounts = this.web3.eth.accounts;
        const acc = accounts.create();
        const keystore = acc.encrypt(password, {n: walletN});

        return {
            wallet: acc,
            keystore,
        } as IEthAccount;
    }

    public login(keystore) {
        this.configuration.defaultWallet = keystore.address;

        this.web3.eth.accounts.wallet.add(keystore);
        this.web3.eth.defaultAccount = keystore.address;

        return keystore;
    }

    public getBalance(address): Promise<number> {
        return this.web3.eth.getBalance(address).bind(this).then((balance) => {
            return this.web3.utils.fromWei(balance, "ether");
        });
    }

    public async sendAllEther(privateKey, toAddress) {
        const currentBalance = await this.getBalance(this.web3.eth.defaultAccount);
        const currentGasPrice = await this.web3.eth.getGasPrice();

        const estimateGas = await this.web3.eth.estimateGas(
            {
                from: this.web3.eth.defaultAccount,
                to: toAddress,
                amount: currentBalance,
            },
        );

        const signedTx = await this.web3.eth.signTransaction(
            {
                from: this.web3.eth.defaultAccount,
                gasPrice: currentGasPrice,
                gas: estimateGas,
                gasLimit: estimateGas * 2,
                to: toAddress,
                value: currentBalance - estimateGas * currentGasPrice * 2,
                data: "",
            }, privateKey,
        );

        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }

    public async sendEther(toAddress, balance) {
        const weiBalance = this.web3.utils.toWei(balance, "ether");
        const currentGasPrice = await this.web3.eth.getGasPrice();

        const estimateGas = await this.web3.eth.estimateGas(
            {
                from: this.web3.eth.defaultAccount,
                to: toAddress,
                amount: weiBalance,
            },
        );

        return await this.web3.eth.sendTransaction(
            {
                from: this.web3.eth.defaultAccount,
                gasPrice: currentGasPrice,
                gas: estimateGas,
                gasLimit: estimateGas * 2,
                to: toAddress,
                value: weiBalance,
            },
        );
    }

    public async getContractCode(contractAddress) {
        return await this.web3.eth.getCode(contractAddress);
    }

    /**
     * Call contract function
     * @param name
     * @param address
     * @param params
     * @param generalParams
     * @param confirmation
     */
    public async callFunction(name, params, generalParams, confirmation?: EthConfirmation, abi?, contractAddress?) {
        confirmation = confirmation === undefined ? 0 : confirmation;

        let contract = null;
        let code = null;
        let defaultWallet = null;
        const payable: boolean = this.isMethodPayable(name, abi === undefined ? this.abiConfiguration : abi);

        if (abi && contractAddress) {
            // Get contract code if the function is payable, otherwise skip gas fee
            if (payable) {
                code = await this.getContractCode(contractAddress);
            }
            contract = new this.web3.eth.Contract(abi, contractAddress);
            defaultWallet = this.configuration.defaultWallet;
        } else {
            defaultWallet = this.abiConfiguration.defaultWallet;
            code = this.bin.code;
            contract = new this.web3.eth.Contract(this.abiConfiguration, this.configuration.contractAddress);
        }

        // We do not need to estimate gas if function is not payable
        if (generalParams.gas === undefined && payable) {
            const ets = await this.web3.eth.estimateGas({data: code, to: defaultWallet});
            generalParams.gas = ets;
            generalParams.gasLimit = ets * 2;
        }

        const method = contract.methods[name](...params);

        const GAS_PRICE = await this.web3.eth.getGasPrice();
        const GAS = await method.estimateGas(generalParams);
        generalParams.gas = GAS;
        generalParams.gasLimit = GAS * 2;
        generalParams.gasPrice = GAS_PRICE;

        return new Promise((resolve, reject) => {
            try {
                switch (confirmation) {
                    case EthConfirmation.RECEIPT: {
                        method.send(generalParams).on("receipt", (rec) => {
                            resolve(rec);
                        }).catch((err) => {
                            reject(err);
                        });
                        break;
                    }
                    case EthConfirmation.CONFIRMATION: {
                        method.send(generalParams).on("confirmation", (confNumber, receipt) => {
                            receipt.confNumber = confNumber;
                            resolve(receipt);
                        }).catch((err) => {
                            reject(err);
                        });
                        break;
                    }
                    case EthConfirmation.STATIC: {
                        method.call(generalParams, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                        break;
                    }
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    public recoverAccount(pkSeed) {
        const hdKey = new HDPrivateKey(pkSeed);
        const privKey = hdKey.privateKey.toString();

        const accounts = this.web3.eth.accounts;
        const acc = accounts.privateKeyToAccount("0x" + privKey);
        return acc;
    }

    public toWei(amount, conversion) {
        return this.web3.utils.toWei(amount, conversion);
    }

    public fromWeiToEther(weiValue) {
        const ether = this.web3.utils.fromWei(weiValue, "ether");
        return ether;
    }

    public isMethodPayable(name: string, abi: any[]): boolean {
        for (const i in abi) {
            if (abi[i].name === name) {
                return abi[i].stateMutability !== "nonpayable";
            }
        }
        return false;
    }

    /**
     * Get raw change address
     * Unfortunately this is not working normal so far therefore it will be fallback to BlockCypher
     * @returns {Promise<null>}
     */
    public async getTransactionList(address: string) {
        return await this.getTransactionsFromBlockCypher(address);
    }

    /**
     * Get the blocks from chain
     * Basically we could make full client out of this
     * @param startingBlock
     * @param stoppingBlock
     * @param callback
     * @returns {Promise<any>}
     */
    public async scanBlockRange(startingBlock?, stoppingBlock?, callback?): Promise<any> {

        // If they didn't provide an explicit stopping block, then read
        // ALL of the blocks up to the current one.
        const that = this;
        const results = [];
        return new Promise(async (resolve, reject) => {

            if (!stoppingBlock) {
                stoppingBlock = await that.web3.eth.getBlockNumber();
            }

            if (!startingBlock) {
                startingBlock = stoppingBlock - 10;
            }

            // If they asked for a starting block that's after the stopping block,
            // that is an error (or they're waiting for more blocks to appear,
            // which hasn't yet happened).

            if (startingBlock > stoppingBlock) {
                return -1;
            }

            let blockNumber = startingBlock;
            let gotError = false;
            let numThreads = 0;
            const startTime = new Date();

            function getPercentComplete(bn) {
                const t = stoppingBlock - startingBlock;
                const n = bn - startingBlock;
                return Math.floor(n / t * 100);
            }

            function scanTransactionCallback(txn, block) {

                // let ether = that.web3.utils.fromWei(txn.value, "ether");
                // let message = `\r${block.timestamp} +${ether} from ${txn.from}`;

                if (txn.to === that.web3.defaultAccount) {

                    // A transaction credited ether into this wallet
                    const ether = that.web3.utils.fromWei(txn.value, "ether");
                    const message = `\r${block.timestamp} +${ether} from ${txn.from}`;
                    results.push(message);

                } else if (txn.from === that.web3.defaultAccount) {

                    // A transaction debitted ether from this wallet
                    const ether = that.web3.utils.fromWei(txn.value, "ether");
                    const message = `\r${block.timestamp} -${ether} to ${txn.to}`;
                    results.push(message);
                }
            }

            function exitThread() {
                if (--numThreads === 0) {
                    const numBlocksScanned = 1 + stoppingBlock - startingBlock;
                    const stopTime = new Date();
                    const duration = (stopTime.getTime() - startTime.getTime()) / 1000;
                    const blocksPerSec = Math.floor(numBlocksScanned / duration);
                    // tslint:disable-next-line
                    const msg = `Scanned to block ${stoppingBlock} (${numBlocksScanned} in ${duration} seconds; ${blocksPerSec} blocks/sec).`;
                    const len = msg.length;
                    const numSpaces = process.stdout.columns - len;
                    const spaces = Array(1 + numSpaces).join(" ");

                    process.stdout.write("\r" + msg + spaces + "\n");
                    if (callback) {
                        callback(gotError, stoppingBlock);
                    }
                }
                resolve(results);
                return numThreads;
            }

            function scanBlockCallback(block) {
                if (block.transactions) {
                    for (const i of block.transactions) {
                        const txn = i;
                        scanTransactionCallback(txn, block);
                    }
                }
            }

            function asyncScanNextBlock() {

                // If we've encountered an error, stop scanning blocks
                if (gotError) {
                    return exitThread();
                }

                // If we've reached the end, don't scan more blocks
                if (blockNumber > stoppingBlock) {
                    return exitThread();
                }

                // Scan the next block and assign a callback to scan even more
                // once that is done.
                const myBlockNumber = blockNumber++;

                // Write periodic status update so we can tell something is happening
                if (myBlockNumber % that.maxThreads === 0 || myBlockNumber === stoppingBlock) {
                    const pctDone = getPercentComplete(myBlockNumber);
                    process.stdout.write(`\rScanning block ${myBlockNumber} - ${pctDone} %`);
                }

                // Async call to getBlock() means we can run more than 1 thread
                // at a time, which is MUCH faster for scanning.

                that.web3.eth.getBlock(myBlockNumber, true, (error, block) => {
                    if (error) {
                        // Error retrieving this block
                        gotError = true;
                        // console.error("Error:", error);
                    } else {
                        scanBlockCallback(block);
                        asyncScanNextBlock();
                    }
                });
            }

            let nt;
            for (nt = 0; nt < that.maxThreads && startingBlock + nt <= stoppingBlock; nt++) {
                numThreads++;
                asyncScanNextBlock();
            }

            return nt; // number of threads spawned (they'll continue processing)
        });
    }

    private async getFeeFromBlockCypher() {
        const res = await axios.get("https://api.blockcypher.com/v1/btc/test3");
        return res.data.result.medium_fee_per_kb;
    }

    private async getTransactionsFromBlockCypher(address: string, limit: string = "50") {
        const res = await axios.get(`https://api.blockcypher.com/v1/beth/test/addrs/${address}/full?limit=${limit}`);
        return res.data;
    }
}
