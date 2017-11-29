import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

declare const BigchainDB;

@Injectable()
export class BigchainDbService {
  private kp;
  private conn;

  constructor() {
    this.kp = new BigchainDB.Ed25519Keypair();
    this.conn = new BigchainDB.Connection(environment.apihost, {
      app_id: environment.appid,
      app_key: environment.appkey
    });
  }

  find(data) {
    return Observable.fromPromise(this.conn.searchAssets(data));
  };

  send(data) {
    const tx = BigchainDB.Transaction.makeCreateTransaction(
      data,
      null,
      [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(this.kp.publicKey))], this.kp.publicKey);
    const txSigned = BigchainDB.Transaction.signTransaction(tx, this.kp.privateKey);
    return this.conn.postTransaction(txSigned);
  };
}
