const Script = require('bitcore').Script;
const Opcode = require('bitcore').Opcode;
const Buffer = require('buffer/').Buffer;

export const redeemP2SHContract = (contract, sig, pubkey, secret) => {
  const script = new Script();
  script.add(new Buffer(sig, 'hex'));
  script.add(new Buffer(pubkey, 'hex'));
  script.add(new Buffer(secret, 'hex'));
  script.add(Opcode.OP_1);
  // script.add(Opcode.OP_PUSHDATA#());
  script.add(new Buffer(contract, 'hex'));

  // console.log("** string   ", contract);
  // console.log("** hex  ",  new Buffer(contract, 'hex'));
  // console.log("** hexStr  ", new Buffer(contract).toString('hex'));
  // console.log("** from  ", Buffer.from(contract, "hex"));
  // console.log('-------------------------------------------------------');
  // ** string    63a61429c36b8dd380e0426bdc1d834e74a630bfd5d1118876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da5816704d728bd59b17576a91406fb26221375b1cbe2c17c14f1bc2510b9f8f8ff6888ac
  // ** hex   <Buffer 63 a6 14 29 c3 6b 8d d3 80 e0 42 6b dc 1d 83 4e 74 a6 30 bf d5 d1 11 88 76 a9 14 eb cf 82 2c 4a 2c db 5f 6a 6b 9c 4a 59 b7 4d 66 46 1d a5 81 67 04 d7 ... >
  // ** hexStr   363361363134323963333662386464333830653034323662646331643833346537346136333062666435643131313838373661393134656263663832326334613263646235663661366239633461353962373464363634363164613538313637303464373238626435396231373537366139313430366662323632323133373562316362653263313763313466316263323531306239663866386666363838386163
  // ** from   <Buffer 63 a6 14 29 c3 6b 8d d3 80 e0 42 6b dc 1d 83 4e 74 a6 30 bf d5 d1 11 88 76 a9 14 eb cf 82 2c 4a 2c db 5f 6a 6b 9c 4a 59 b7 4d 66 46 1d a5 81 67 04 d7 ... >


  // script.add(Buffer.from(sig, "hex"));
  // script.add(Buffer.from(pubkey, "hex"));
  // script.add(Buffer.from(secret, "hex"));
  // script.add(Opcode.OP_1);
  // // script.add(Opcode.OP_PUSHDATA#());
  // script.add(Buffer.from(contract, "hex"));
  return script;
};
