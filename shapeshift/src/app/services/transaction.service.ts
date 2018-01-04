import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/';
import {Http} from '@angular/http';
import {TransactionModel} from "../models/transaction.model";

@Injectable()
export class TransactionService {

  // TODO: Add https
  private url = 'https://service1.altcoin.io:3001/data/transactions:';

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
      return this.http.get(`${this.url}${address}`).map(res => res.json());
    } catch (ex) {
      throw ex;
    }
  }
}
