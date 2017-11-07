const Script = require('bitcore').Script;


// redeemAtomicSwapSigScriptSize is the worst case (largest) serialize size
// of a transaction input script to redeem the atomic swap contract.  This
// does not include final push for the contract itself.
//
//   - OP_DATA_73
//   - 72 bytes DER signature + 1 byte sighash
//   - OP_DATA_33
//   - 33 bytes serialized compressed pubkey
//   - OP_DATA_32
//   - 32 bytes secret
//   - OP_TRUE
const redeemAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1 + 32 + 1

// refundAtomicSwapSigScriptSize is the worst case (largest) serialize size
// of a transaction input script that refunds a P2SH atomic swap output.
// This does not include final push for the contract itself.
//
//   - OP_DATA_73
//   - 72 bytes DER signature + 1 byte sighash
//   - OP_DATA_33
//   - 33 bytes serialized compressed pubkey
//   - OP_FALSE
const refundAtomicSwapSigScriptSize = 1 + 73 + 1 + 33 + 1

// https://github.com/btcsuite/btcwallet/blob/8e723ea45456fc3e6208a399c849aca54a0d959f/wallet/txrules/rules.go#L80
export const feeForSerializeSize =(relayFeePerKb, txSerializeSize)=>{
  const fee = relayFeePerKb * txSerializeSize / 1000
}

export const sumOutputSerializeSizes = (outputs)=>{
  let serializeSize = 0
  for (let output of outputs) {
    serializeSize += output.toBufferWriter().toBuffer().byteLength()
  }
  console.log("**sumOutput",serializeSize);
  return serializeSize
}


// inputSize returns the size of the transaction input needed to include a
// signature script with size sigScriptSize.  It is calculated as:
//
//   - 32 bytes previous tx
//   - 4 bytes output index
//   - Compact int encoding sigScriptSize
//   - sigScriptSize bytes signature script
//   - 4 bytes sequence
export const inputSize = (sigScriptSize)=>{

}



// estimateRedeemSerializeSize returns a worst case serialize size estimates for
// a transaction that redeems an atomic swap P2SH output.
export const estimateRedeemSerializeSize = (contract, txOuts)=>{

}


// estimateRefundSerializeSize returns a worst case serialize size estimates for
// a transaction that refunds an atomic swap P2SH output.
export const estimateRefundSerializeSize = (contract, txOuts) => {
  const contractPush = new Script(contract);
  const contractPushSize = contractPush.toBuffer().length;

};
