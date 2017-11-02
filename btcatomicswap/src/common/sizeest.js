const Script = require('bitcore').Script;

export const estimateRefundSerializeSize = (contract, txOuts) => {
  const contractPush = new Script(contract);
  const contractPushSize = contractPush.toBuffer().length;

};