import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Http} from '@angular/http';
import {environment} from "../../environments/environment";
import {TransactionModel} from "../models/transaction.model";

@Injectable()
export class TransactionService {

  // TODO: Add https
  private url = environment.orderApi + '/data/transactions:';

  constructor(private http: Http) {
  }

  /**
   * Get all transactions
   * @param address
   * @returns {Observable<TransactionModel>}
   */
  public getTransactions(address): Observable<TransactionModel> {
    return this.fetch(address);
  }

  /**
   * Fetch all transactions for specific address
   * @param address
   */
  private fetch(address): Observable<TransactionModel> {
    try {
      console.log("CALLING TRANSACTION SERVICE: ", `${this.url}${address}`);
      return this.http.get(`${this.url}${address}`).map(res => {
        console.log("DATA: ", res);
        return res.json()
      });
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }
}
