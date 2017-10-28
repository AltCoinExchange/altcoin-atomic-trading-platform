const bs58 = require('bs58');
const Buffer = require('buffer/').Buffer;

export const decodeAddress = (rawAddress) => {
  const decodedAddress = bs58.decode(rawAddress);
  return new Buffer(decodedAddress).toString('hex'); // TODO change to browserify
};
