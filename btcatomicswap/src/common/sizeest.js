const Script = require('bitcore').Script;
const BufferReader  = require('bitcore').encoding.BufferReader;


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
  return fee.toFixed(8)
}


// https://github.com/btcsuite/btcd/blob/915fa6639b092c3d92e351cde47769b5c85fbc1c/wire/common.go#L566
function VarIntSerializeSize(val) {
  const MaxUint16 = 65535
  const MaxUint32 = 4294967295
  // The value is small enough to be represented by itself, so it's
	// just 1 byte.
	if (val < 253) {
		return 1
	}

	// Discriminant 1 byte plus 2 bytes for the uint16.
	if (val <= MaxUint16) {
		return 3
	}

	// Discriminant 1 byte plus 4 bytes for the uint32.
	if (val <= MaxUint32) {
		return 5
	}

	// Discriminant 1 byte plus 8 bytes for the uint64.
	return 9
}


export const sumOutputSerializeSizes = (outputs)=>{
  let serializeSize = 0
  for (let output of outputs) {
    // serializeSize += output.toBufferWriter().toBuffer().byteLength()
    serializeSize += output.toBufferWriter().toBuffer().length
  }
  // console.log("**sumOutput ",serializeSize);
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
  return 32 + 4  + VarIntSerializeSize(sigScriptSize) + sigScriptSize + 4
}



// estimateRedeemSerializeSize returns a worst case serialize size estimates for
// a transaction that redeems an atomic swap P2SH output.
export const estimateRedeemSerializeSize = (contract, txOuts)=>{
  // const contractPush = new Script(contract);
  const contractPushSize = contract.toBuffer().length;
  // 12 additional bytes are for version, locktime and expiry.
  return 12 + VarIntSerializeSize(1) + VarIntSerializeSize(txOuts.length) + inputSize(redeemAtomicSwapSigScriptSize+contractPushSize) + sumOutputSerializeSizes(txOuts)
}


// estimateRefundSerializeSize returns a worst case serialize size estimates for
// a transaction that refunds an atomic swap P2SH output.
export const estimateRefundSerializeSize = (contract, txOuts) => {
  // const contractPush = new Script(contract);
  const contractPushSize = contract.toBuffer().length;
  // console.log("**contractPushSize toBuffer ",contractPushSize);
  // console.log("1",new Buffer(1).length);
  // console.log("**txOuts", txOuts);
  // console.log("**txOuts.length ", txOuts.length)
  // console.log("**inputSize",inputSize(refundAtomicSwapSigScriptSize+contractPushSize));
  // console.log("**sumOutputSerializeSizes",sumOutputSerializeSizes(txOuts));

  return 12 + VarIntSerializeSize(1) + VarIntSerializeSize(txOuts.length) + inputSize(refundAtomicSwapSigScriptSize+contractPushSize) + sumOutputSerializeSizes(txOuts)
};
