import {redeem} from '../src/redeem';
import {initiate} from '../src/initiate';

let contract = "63a6140151bc31f0fe12e9af03f3e9ecbdb7667aa325718876a914566465fd4ac69a7e33fa834a1ca3eea88d97ed196704f5fa085ab17576a91484de1ba798a655b43d3778da0324c6a43e0f15556888ac"
let contractTx = "0100000001b4477181118a1521774afad1fdf5eae5cfcf566e818a462b5f122f6e64f958bd010000006a47304402201ddc7bc365b8ad496201c87193ea3713ef3276a5656261c1b207238bfa2fb9f1022046a88559cc8638b4e1214a5023f67b3bb06a2b96c9e33a1fd12dd16b089a80dc0121021b69245bdf5a07dfd2c8bc6bdabd8654995dd27c99bd02c3fdeb1aff728b32e0feffffff02a08601000000000017a9145f62b9ceb01db13a30730a9afe9cde50a8f1a47687f5af2906000000001976a9146d58832deeb6a1fe12be40507b81c2ea170a483f88ac00000000"
let secret = "2c385dc0f5514525a253e50c0efd3fd42024a749be2bf736a6fe581646270cf1"

const assert = require('assert');

describe('#reedem()', function () {
  this.timeout(15000);
  it.only('should create redeemTx', async () => {
    // const testData = await initiate("moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq", "0.001");
    // console.log(testData);
    redeem(contract, contractTx, secret)

  });
});
