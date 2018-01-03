// import "jest";
// // impoet contractBuilder
// // import {BtcAtomicSwapData} from "./atomic-swap";
// // pass refundAddress, pkhThem, lockTime, secretHash
// import {AtomicSwapScriptTemplates} from "../../src/btc-forks-sw/atomic-swap-script-templates"
// import {address, script as bscript} from "bitcoinjs-lib";
// const assert = require('assert');
//
//
// describe("atomicSwapScriptTemplates", () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//   // it("Should pass sanity", () => {
//   //   // expect(typeof BtcWalletTestNet).toBe("function");
//   //   // console.log(atomicSwapScriptTemplates)
//   //   atomicSwapScriptTemplates.atomicSwapContract()
//   // });
//
//   it('should create atomic swap contract', () => {
//
//     const refundAddr = "mfbEx6gfMVNqjg5bb7C8RBqqYAbbEPue2b";
//     const them = "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG";
//     const lockTime = 1509793660;
//     const secretHash = "34143f8d50ca0ffe331526928c3ebeb393486d9e";
//
//     // const refundAddressHash = new Address(refundAddr).toJSON().hash;
//     // const themHash = new Address(them).toJSON().hash;
//
//     const result = AtomicSwapScriptTemplates.lockScript(refundAddr, them, lockTime, secretHash);
//     assert.equal(result.toString("hex"), '63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac');
//   })
//
//   it("should return the given parametars from script", async () => {
//     const lockScriptHexStr = "63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac"
//     const lockScriptBuffer = Buffer.from(lockScriptHexStr, "hex")
//
//     const {secretHashHexStr, recipientAddressBase58check, lockTime, refundAddressBase58check} = AtomicSwapScriptTemplates.extractLockParams(lockScriptBuffer)
//
//     assert.equal(secretHashHexStr, "34143f8d50ca0ffe331526928c3ebeb393486d9e")
//     assert.equal(recipientAddressBase58check, "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG")
//     assert.equal(lockTime, 1509793660)
//     assert.equal(refundAddressBase58check, "mfbEx6gfMVNqjg5bb7C8RBqqYAbbEPue2b")
//   })
//
//   it("should confirm a valid script from Buffer", () => {
//
//     const lockScriptHexStr = "63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac"
//     const lockScriptBuffer = Buffer.from(lockScriptHexStr, "hex")
//
//     assert.equal(AtomicSwapScriptTemplates.checkLockScript(lockScriptBuffer), true);
//   })
//
//   it("should confirm a valid script from hex string", () => {
//
//     const lockScriptHexStr = "63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac"
//     const lockScriptBuffer = Buffer.from(lockScriptHexStr, "hex")
//
//     assert.equal(AtomicSwapScriptTemplates.checkLockScript(lockScriptHexStr), true);
//   })
//
//   // it("should return false because of invalid script", () => {
//   //
//   //   const lockScriptHexStr = "63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac"
//   //   const lockScriptBuffer = Buffer.from(lockScriptHexStr, "hex")
//   //
//   //   assert.equal(atomicSwapScriptTemplates.checkLockScript(lockScriptBuffer), false);
//   // })
// })
