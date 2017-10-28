const Script = require('bitcore').Script;
const Transaction = require('bitcore').Transaction;

export const auditContract = (ct, tx) => {

  const contract = new Script(ct);
  const contractScriptHashOut = contract.toScriptHashOut();
  const contractAddress = contractScriptHashOut.toAddress().toJSON().hash;

  const transaction = new Transaction(tx);

  const hasTxOut = transaction.toJSON().outputs.some((output => {
    const script = new Script(output.script);
    const address = script.toAddress('testnet');
    const addressHash = address.toJSON().hash;
    return addressHash === contractAddress;
  }));

  if (!hasTxOut) {
    console.error('transaction does not contain the secret');
    return;
  }

  console.log(hasTxOut);

};
