import {switchAll} from "rxjs/operators";
import * as Web3 from "web3/src";
import {Account, Contract} from "web3/types";
import {IEthAccount} from "./eth-account";

const walletN = 256;

export enum EthConfirmation {
  RECEIPT = 0,
  CONFIRMATION = 1,
  STATIC = 2,
}

export class EthEngine {
  protected web3: any;
  private contract: Contract;

  constructor(private abiConfiguration, public configuration, private bin) {
    const wsProvider = new Web3.providers.WebsocketProvider(configuration.wshost);
    this.web3 = new Web3(wsProvider);
    this.web3.defaultAccount = configuration.defaultWallet;

    if (abiConfiguration) {
      this.contract = new this.web3.eth.Contract(abiConfiguration, configuration.contractAddress);
    }
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

  public login(keystore, password) {
    const accounts = this.web3.eth.accounts;

    const wallet = accounts.decrypt(keystore, password);
    this.configuration.defaultWallet = wallet.address;

    this.web3.eth.accounts.wallet.add(wallet);
    this.web3.eth.defaultAccount = wallet.address;

    return wallet;
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

    return new Promise((resolve, reject) => {
      try {
        const method = contract.methods[name](...params);
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

  public recoverAccount(privateKey, password?) {
    const accounts = this.web3.eth.accounts;
    const acc = accounts.privateKeyToAccount(this.web3.utils.asciiToHex(privateKey));
    return acc.encrypt(privateKey, password);
  }

  public toWei(amount, conversion) {
    return this.web3.utils.toWei(amount, conversion);
  }

  public isMethodPayable(name: string, abi: any[]): boolean {
    for (const i in abi) {
      if (abi[i].name === name) {
        return abi[i].payable;
      }
    }
    return false;
  }
}
