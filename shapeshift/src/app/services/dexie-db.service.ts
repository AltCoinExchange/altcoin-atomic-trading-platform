import {Injectable} from "@angular/core";
// import {environment} from "../../environments/environment";
// import {Observable} from "rxjs/Observable";

// import Dexie from 'dexie';

@Injectable()
export class DexieDbService<T> {
  // extends Dexie {
  // public default: Dexie.Table<T, number>;
  constructor() {
    // super(name);
    const db = this;
    // Define tables and indexes
    //
    // db.version(1).stores({
    //   contacts: '++id, firstName, lastName',
    //   emails: '++id, contactId, type, email',
    //   phones: '++id, contactId, type, phone',
    // });


    // let r = new() => T;

    //
    // const hm: any = typeof(T);
    //
    // let alo = new (typeof T);

    // Let's physically map Contact class to contacts table.
    // This will make it possible to call loadEmailsAndPhones()
    // directly on retrieved database objects.
    // db.default.mapToClass(T);
  }
  //
  // find(data) {
  //   return Observable.fromPromise(this.conn.searchAssets(data));
  // };
  //
  // send(data) {
  //   const tx = BigchainDB.Transaction.makeCreateTransaction(
  //     data,
  //     null,
  //     [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(this.kp.publicKey))], this.kp.publicKey);
  //   const txSigned = BigchainDB.Transaction.signTransaction(tx, this.kp.privateKey);
  //   return this.conn.postTransaction(txSigned);
  // };
}
