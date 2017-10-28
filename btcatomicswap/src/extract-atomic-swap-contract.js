const Script = require('bitcore').Script;

export const extractAtomicSwapContract = (ct) => {
  const contract = new Script(ct);
  const pops = contract.toString().split(' ');
  console.log(pops);
  const opCodes = pops.filter(opcode => opcode.indexOf('0x') === -1);




  const secretHash = pops[3];
  const recepientHash = pops[8];
  const refundHash160 = pops[17];

  console.log('secretHash', secretHash);
  console.log('recepientHash', recepientHash);
  console.log('refundHash160', refundHash160);

};
