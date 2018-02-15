import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {LoadTransactionAction} from "../../actions/transaction.action";
import {getTransactions} from "../../selectors/transaction.selector";
import {TransactionState} from "../../reducers/transaction.reducer";
import {DataSource} from "@angular/cdk/collections";
import {Element, OrderDataSource} from "../../swap/swap-container/swap-container.component";
import {OrderService} from "../../services/order.service";
import {TransactionService} from "../../services/transaction.service";
import {TransactionDetailsModel, TransactionModel} from "../../models/transaction.model";
import * as moment from 'moment';

@Component({
  selector: 'app-transactions-wallet',
  templateUrl: './transactions-wallet.component.html',
  styleUrls: ['./transactions-wallet.component.scss']
})
export class TransactionsWalletComponent implements OnInit {
  @Input() address;
  transactions;
  transactionsLoaded = false;

  constructor(private store: Store<AppState>, public transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(){
    this.transactionService.getTransactions(this.address).subscribe(data => {
      this.transactionsLoaded = true;
      this.transactions = data.from.concat(data.to) as TransactionDetailsModel[];
      this.transactions = this.transactions.filter((transaction) => transaction !== undefined).map((transaction) => {
        transaction.value = (parseFloat(transaction.value) / 1000000000000000000).toString();
        transaction.detailsClosed = true;
        transaction.relativeDate = moment.unix(transaction.timestamp).fromNow();
        transaction.date = moment.unix(transaction.timestamp).format('D MMM YYYY hh:ss');
        return transaction;
      });
      this.transactions = this.transactions.sort((a,b) => {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
      });
      console.log('transactions ', this.transactions)
    });
  }

  openDetails(transaction){
    transaction.detailsClosed = !transaction.detailsClosed;
  }
}


