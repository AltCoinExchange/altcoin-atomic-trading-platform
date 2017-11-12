import {RC4} from "./rc4";

export class ShapeshiftStorage {
  static set(key: string, value: string) {
    const encryptedKey = RC4.encDec('KLJUC', key);
    const encryptedData = RC4.encDec('KLJUC', value);
    localStorage.setItem(encryptedKey, encryptedData);
  }

  static get(key: string) {
    const encryptedKey = RC4.encDec('KLJUC', key);
    const encrytpedData = localStorage.getItem(encryptedKey);
    const decryptedData = RC4.encDec('KLJUC', encrytpedData);
    return decryptedData;
  }
}
