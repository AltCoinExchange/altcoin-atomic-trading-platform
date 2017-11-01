import {initiate} from './initiate';
// export * from './initiate';

console.log('-------------------------------------------------------');
/**
 * INITIATE
 */
// ubuntu@ip-172-31-31-226:~$ bitcoin-cli -testnet -rpcuser=bedrock -rpcpassword=bedrock getnewaddress
// mxTRJVKSPjjrFeDBkzNZFTy4cur83WQk5R
// initiate("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.01");


import {auditContract} from './audit-contract';

/**
 * AUDIT CONTRACT
 */
auditContract("63a61429c36b8dd380e0426bdc1d834e74a630bfd5d1118876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da5816704d728bd59b17576a91406fb26221375b1cbe2c17c14f1bc2510b9f8f8ff6888ac",
  "010000000267864c7145e43c84d13b514518cfdc7ca5cf2b04764ed2672caa9c8f6338a3e3010000006b483045022100901602e523f25e9659951d186eec7e8b9df9d194e8013fb6d7a05e4eafdbb61602207b66e0179a42c54d4fcfca2b1ccd89d56253cc83724593187713f6befb37866201210288ef714849ce7735b64ed886d056b80d0a384ca299090f684820d31e7682825afeffffff3ac58ce49bcef3d047ea80281659a78cd7ef8537ca2bfce336abdce41450d2d7000000006b483045022100bd1246fc18d26a9cc85c14fb60655da2f2e845af906504b8ba3acbb1b0ebf08202201ec2cd5a0c94e9e6b971ec3198be0ff57e91115342cd98ccece98d8b18294d86012103406e35c37b3b85481db7b7f7807315720dd6486c25e4f3af93d5d5f21e743881feffffff0248957e01000000001976a914c1925e7398d325820bba18726c387e9d80047ef588ac00e1f5050000000017a9142d913627b881255c417787cc255ccad9a33ce48d8700000000");
// contract
// 63a61464687e4d92afd1761ecb22d3aae42c609d5e2a368876a914a22a841f0212b3bb1d51691a3b1a9a9d5dee180d67051509379577b17576a914fd3c3fa09a1db2a3ef7a8be039325c924130c8df6888ac

// tx
// 01000000012547d15fa7eb699fc384fe7ca364453db8cbc07099fd610090b5a4b79f2949d1010000006b483045022100ee8596cdd246b934c4f9c5573c065568be45d457e73053d2d9b11ea56ecc1d1d02204a1470e0ad4710f1dda32252d162f6f4fb2882e8bc64845dd73b5033b16a5f130121039df726f88a9cd11ed00ea32ea8e6f3dda1ee90602ee406c210c966a97ce73cc9feffffff0240420f000000000017a9145490886592e5cf3110d38e3da09449aca38d89e1875f173105000000001976a91443707c19148f5beef8fd0a4e354f01fe927f64b488ac00000000






// ANTO AND ADMIR !! GENERATE address from hash
// const Base58Check = require('bitcore').encoding.Base58Check;
// const Base58 = require('bitcore').encoding.Base58;
// const Address = require('bitcore').Address;
//
//
// const recipientHash = "ebcf822c4a2cdb5f6a6b9c4a59b74d66461da581";
//
// const testnetBuffer = Buffer.from([0x6F]);
// const recipientBuffer = Buffer.from(recipientHash, "hex");
//
// const buffer21 = Buffer.concat([testnetBuffer, recipientBuffer], 21);
//
// const encoded = Base58Check.encode(buffer21);
//
// console.log(Address.fromString(encoded));

//HELL YEAH!!!