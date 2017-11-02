const RIPEMD160 = require('ripemd160');
const crypto = require('crypto-browserify');

export const generateSecret = () => {
  const secretBuffer = crypto.randomBytes(32);
  const secret = secretBuffer.toString('hex');
  const secretHash = ripemd160(secretBuffer);

  return {
    secret,
    secretHash,
  };
};

/**
 * Hash256 then RIPEMD160 = hash160
 * @param value
 */

export const hash160 = (value) => {
  const hashScriptBuffer = crypto.createHash('sha256').update(value).digest();
  return new RIPEMD160().update(hashScriptBuffer).digest('hex');
};


export const hash160Buffer = (value) => {
  const hash = crypto.createHash('sha256').update(value).digest();
  return new RIPEMD160().update(hash).digest();
};

export const ripemd160 = (value) => {
  return new RIPEMD160().update(value).digest('hex');
};

export const ripemd160Buffer = (value) => {
  return new RIPEMD160().update(value).digest();
};