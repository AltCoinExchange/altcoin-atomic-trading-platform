import {RC4} from "./rc4";

export class AltcoinioStorage {
  static set(key: string, value: string) {
    const decrKey = localStorage.getItem("PW");
    const encryptedKey = RC4.encDec(decrKey, key);
    const encryptedData = RC4.encDec(decrKey, value);
    localStorage.setItem(encryptedKey, encryptedData);
  }

  static get(key: string) {
    let decrKey = localStorage.getItem("PW");
    if (!decrKey) {
      decrKey = "KLJUC";
    }
    const encryptedKey = RC4.encDec(decrKey, key);
    const encrytpedData = localStorage.getItem(encryptedKey);
    const decryptedData = RC4.encDec(decrKey, encrytpedData);
    return decryptedData;
  }
}
