import {configuration} from '../config/config';
const Transaction = require('bitcore').Transaction;
const PrivateKey = require('bitcore').PrivateKey;

const RpcClient = require('bitcoind-rpc');
const Address = require('bitcore').Address;
const rpc = new RpcClient(configuration);

// export async function createSig(reedemTx, inputIndex, contract, recipientAddress){
//     const wif = await getPrivKey(recipientAddress)
//     const WIF = new PrivateKey(wif)
//     const sighashType = 1
//     const sig = Transaction.Sighash.sign(reedemTx, WIF, sighashType, inputIndex, contract)
//     const pubKey = WIF.toPublicKey()
//     return {sig, pubKey}
// }
export const getBalance = async (address) => {
    //const addr = new Address(address);
    //const accAddr = await getFunc('getAccountAddress', [address]);
    //const rec = await getFunc('getReceivedByAddress', [accAddr, 1]);

    //const addrs = await getFunc('getAddressesByAccount', [address]);

    //const addrBalance = await getFunc('getReceivedByAddress', [address, 1]);

    //console.log(addrs);

    const balance = await getFunc('getBalance', [address, 1]);
    return balance;
};

const getFunc = async (func, params) => {
    return new Promise((resolve, reject) => {
        rpc[func](...params, (c, e) => {
            resolve(e.result);
        });
    });
};
