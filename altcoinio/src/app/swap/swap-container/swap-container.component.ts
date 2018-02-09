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
import {Coins} from "../../models/coins/coins.enum";
import {Subject} from "rxjs/Subject";


@Component({
  selector: "app-swap-container",
  templateUrl: "./swap-container.component.html",
  styleUrls: ["./swap-container.component.scss"]
})
export class SwapContainerComponent implements OnInit {
  displayedColumns = ["from", "to", "trade"];
  dataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  pageChanges = new Subject<any>();
  socketSubscription: Subscription;

  tableOrderLength = 100;
  tableOrderPageSize = 10;

  constructor(private store: Store<AppState>, public orderService: OrderService, private wsOrderService: OrderMatchingService,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new OrderDataSource(this.dataSubject);
  }

  ngOnInit() {
    this.wsOrderService.connect();
    this.socketSubscription = this.wsOrderService.messages.combineLatest(this.pageChanges).subscribe(([message, page]) => {
      const jsonMessage = JSON.parse(message);
      if (jsonMessage.message === "getActiveOrders") {
        this.tableOrderLength = jsonMessage.data.length;
        jsonMessage.data = this.paginate(jsonMessage.data.map(msg => {
          msg.fromCoin = CoinFactory.createCoinFromString(msg.from);
          msg.toCoin = CoinFactory.createCoinFromString(msg.to);
          return msg;
        }), page.pageSize, page.pageIndex);

        this.dataSubject.next(jsonMessage.data);
        if (!this.changeDetectorRefs['destroyed']) {
          this.changeDetectorRefs.detectChanges();
        }
      }
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

  ngOnDestroy() {
    this.changeDetectorRefs.detach();
  }

  ngAfterViewInit() {
    this.pageChanges.next({pageIndex: 0, pageSize: 1, length: 10});
  }

  onPageChange(pageChange: any) {
    this.pageChanges.next(pageChange);
    // {pageIndex: 0, pageSize: 1, length: 1}
  }

  paginate (array, page_size, page_number) {
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
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
