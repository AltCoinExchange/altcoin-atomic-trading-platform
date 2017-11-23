/**
 * Ethereum wallet TS
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

import * as AppConfig from "./config/config-eth";
import * as AtomicSwap from "ethatomicswap";
import {AtomicSwapAbi} from "./config/abi/atomicswap";
import {AtomicSwapBin} from "./config/abi/bin";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";

export class EthWallet {
  private atomicSwap: any;

  constructor() {
    this.atomicSwap = new AtomicSwap(AtomicSwapAbi, AppConfig.EthConfiguration.hosts[0], AtomicSwapBin);
  }

  /**
   * Login
   * @param keystore
   * @param password
   */
  public login(keystore, password) {
    return this.atomicSwap.engine.Login(keystore, password);
  }

  /**
   * Create account
   * @param password
   * @returns {{wallet, keystore}}
   */
  public create(password) {
    return this.atomicSwap.engine.CreateAccount(password);
  }

  /**
   * Recover account with password
   * @param password
   * @param privateKey
   * @returns {{wallet, keystore}}
   */
  public recover(privateKey, password) {
    return this.atomicSwap.engine.RecoverAccount(privateKey, password);
  }

  /**
   * Get wallet balance
   * @param address
   * @returns {*}
   */
  public getbalance(address): Observable<any> {
    return Observable.fromPromise(this.atomicSwap.engine.GetBalance(address));
  }

  /**
   * Send All Ether
   * @param privateKey
   * @param toAddress
   * @returns {Promise<number>}
   */
  public sendAllEther(privateKey, toAddress): Observable<any> {
    // return  this.atomicSwap.engine.sendAllEther(privateKey, toAddress);
    throw new Error("atomicSwap.engine.sendAllEther not implemented");
  }

  /**
   * Initiate atomic swap
   * @param refundTime
   * @param secret
   * @param address
   * @param amount
   * @returns {Promise.<*>}
   */
  public initiate(refundTime, secret, address, amount): Observable<any> {

    let secretObj = null;

    if (secret === "") {
      secretObj = this.atomicSwap.common.GenerateSecret();
      if (secretObj.hashedSecret.indexOf("0x") === -1) {
        secret = "0x" + secretObj.hashedSecret;
      } else {
        secret = secretObj.hashedSecret;
      }
    }

    return Observable.fromPromise(this.atomicSwap.Initiate(refundTime, secret, address, amount)).map((result: any) => {
      result.secret = secretObj;
      return result;
    });
  }

  /**
   * Participate in atomic swap
   * @param refundTime
   * @param secret
   * @param address
   * @param amount
   * @returns {Promise.<*>}
   */
  public participate(refundTime, secret, address, amount): Observable<any> {
    return Observable.fromPromise(this.atomicSwap.Participate(refundTime, secret, address, amount));
  }

  /**
   * Extract swap info
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public extractsecret(hashedSecret): Observable<any> {
    return Observable.fromPromise(this.atomicSwap.ExtractSecret(hashedSecret));
  }

  /**
   * Redeem atomic swap
   * @param secret
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public redeem(secret, hashedSecret): Observable<any> {
    return Observable.fromPromise(this.atomicSwap.Redeem(secret, hashedSecret));
  }

  /**
   * Refund atomic swap
   * @param hashedSecret
   * @returns {Promise.<*>}
   */
  public refund(hashedSecret): Observable<any> {
    return Observable.fromPromise(this.atomicSwap.Refund(hashedSecret));
  }
}
