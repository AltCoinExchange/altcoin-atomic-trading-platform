import {redeem} from '../src/redeem';
import {initiate} from '../src/initiate';
const assert = require('assert');



const addr = "mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ"
const pubKey = "0263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908"
// const privateKey = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a"
const privateKey = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a"
// b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79
const rpcAddr = "moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq"

describe('#reedem()', function () {
  this.timeout(15000);
  it('should create redeemTx', async () => {
    const testData = await initiate("mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ", 0.001, privateKey);
    // console.log(testData);
    // redeem(contract, contractTx, secret, privateKey)

  });
});


// const contract = "63a6141027b20731c5ef3e84a650977e2b96697a2824d08876a9144ff94075bfd8e49cd5bad195371a3389be5f196867041b1d0b5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac"
// const contractTx = "01000000013be00d0efe4dca72076ddcdaba8946f0c25aa8dbf37e8d2fef1f25c96e80d4d8010000006a47304402201345dd0a7aecef84b4f72fb0992a9d38c2d2fee347f68c0d92fd3e0bc888782402206cc3233cb3f91dd7146fd78527a13a4f7e9a310e2b801fb675e5eee345a80aef01210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02a08601000000000017a914f4a315ed30fae4499997567f773b3884c0008f9b87008ab907000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000"
// const secret = "32076d74ab4790c136cb8b800bcf0cff34584dfdab92f59471e98d9ee4c669da"

const contract = "63a61434e16b009a7c366e53feb174dceb3d2b77eb07438876a9144ff94075bfd8e49cd5bad195371a3389be5f196867042f1e0b5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac"
const contractTx = "01000000012e4c32f65209df86d06b9eb3a62ac9c466183387dd2063b7ae0d4c712e54a716000000006a47304402205b3632c1546f7eafd0d52d571090a1ad2c9e3173b777bbec6c1fabd4a7c9c83702206c4e894d298c337a3c2f48974d0be2c9bd2291e9821e1153b2a99181e1dc5ab001210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02a08601000000000017a914321a5a1820bbec5c24cf2eb508ab5bef64e70a2e8750e7f400000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000"
const secret = "7354c5eafa13ac614c70d31ac70465a77b52292df8ec2e579e7d710323221171"


describe('#reedem()', function () {
  this.timeout(15000);
  it('should create redeemTx', async () => {
    // const testData = await initiate("mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ", 0.001, privateKey);
    // console.log(testData);
    redeem(contract, contractTx, secret, privateKey)

  });
});
