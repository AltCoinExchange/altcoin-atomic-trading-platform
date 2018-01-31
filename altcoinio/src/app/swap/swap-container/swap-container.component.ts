import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {OrderService} from "../../services/order.service";
import {AppState} from "../../reducers/app.state";
import {Store} from "@ngrx/store";
import * as sideB from "../../actions/side-B.action";
import {Coin, CoinFactory} from "../../models/coins/coin.model";
import {OrderMatchingService} from "../../services/order-matching.service";
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Component({
  selector: "app-swap-container",
  templateUrl: "./swap-container.component.html",
  styleUrls: ["./swap-container.component.scss"]
})
export class SwapContainerComponent implements OnInit {
  displayedColumns = ["from", "to"];
  dataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  socketSubscription: Subscription;

  constructor(private store: Store<AppState>, public orderService: OrderService, private wsOrderService: OrderMatchingService,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new OrderDataSource(this.dataSubject);
  }

  ngOnInit() {
    this.wsOrderService.connect();
    this.socketSubscription = this.wsOrderService.messages.subscribe((message: string) => {
      const jsonmessage = JSON.parse(message);
      this.dataSubject.next(jsonmessage);
      this.changeDetectorRefs.detectChanges();
    });

    this.wsOrderService.send("{\"type\": \"getActiveOrders\"}");
  }

  onRowClick(rowData) {
    // Create coins
    const depositCoin = CoinFactory.createCoinFromString(rowData.from);
    depositCoin.amount = rowData.fromAmount;

    const receiveCoin = CoinFactory.createCoinFromString(rowData.to);
    receiveCoin.amount = rowData.toAmount;

    rowData.depositCoin = depositCoin;
    rowData.receiveCoin = receiveCoin;
    rowData.coin = receiveCoin;

    rowData.link = { order_id: rowData.id };

    this.store.dispatch(new sideB.InitiateAction(rowData));
  }
}

export interface Element {
  from: string;
  to: string;
  id: number;
  fromAmount: number;
  toAmount: number;
}

export class OrderDataSource extends DataSource<any> {

  constructor(private subject: BehaviorSubject<any[]>) {
    super ();
  }

  connect (): Observable<any[]> {
    return this.subject.asObservable();
  }

  disconnect() {
  }
}
