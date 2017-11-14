import {buildRefund} from '../src/common/build-refund';
import {buildContract} from '../src/contract/build-contract.js'
import {publishTx} from '../src/common/public-tx';

const contract = "63a6140e807ecd103685c9b5b80c1c9e05cb175b4a47588876a9144ff94075bfd8e49cd5bad195371a3389be5f19686704eeee095ab17576a914edcee9a8adc0b1c0eb2c6e32ed298e7ea1bc35b36888ac"
const contractTx = "0100000001f6ecb4934dc59e5c52c8f056d9ba010fa8fd69f2913bd87707a267f53f38b6a7000000006b483045022100b8e90fc22664748f9cad0621c35d67ab615b0fe058b44896acf756056e08882d02205161a6837aba42b6e8fbecf46363fe7995a0f1a3e659f8988827f080d72d3c9001210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02a08601000000000017a914e00146fc5b5b34993d73753d1ea6e00821bd9071874097bc07000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000"
const secret = "e68b66fb0b8eeca281a69f1a1fe1c4cde250613ccdc5e4b1b83153a2f9792b40"
const privateKey = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a"

const addr = "mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ"
const pubKey = "0263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908"


const assert = require('assert');

describe('#refund()', function () {
  it('should create refundTx', async () => {
    const {refundFee, refundTx} = await buildRefund(contract, contractTx, privateKey)
    console.log("**refundFee ",refundFee);
    console.log("**refundTx ",refundTx);
    const rawTx = await publishTx(refundTx.toString());
  });
});
