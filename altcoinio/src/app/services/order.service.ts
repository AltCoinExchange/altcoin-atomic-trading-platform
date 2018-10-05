import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {OrderMatchingService} from "./order-matching.service";
import {Subscription} from "rxjs/Subscription";
import {CoinFactory} from "../models/coins/coin.model";
import {MsgOrder} from "../models/messages/msg-order";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ReplaySubject} from "rxjs/ReplaySubject";
const uuidv4 = require("uuid/v4");

@Injectable()
export class OrderService {
  socketSubscription: Subscription;
  dataSubject = new ReplaySubject<any>();
  constructor(private http: Http,  private wsOrderService: OrderMatchingService) {

  }

  public placeOrder(from, to, fromAmount, toAmount, address) {
    const uniqueId = uuidv4().replace(/-/g, "");
    // Send ws event
    this.wsOrderService.connect();
    this.socketSubscription = this.wsOrderService.messages.subscribe((message: string) => {
      const jsonMessage = JSON.parse(message);
      if (jsonMessage.message == "matchOrder" && jsonMessage.data.id == uniqueId) {
        console.log(jsonMessage);
        this.dataSubject.next(jsonMessage.data);
      }
    });

    const order = new MsgOrder(uniqueId, address, from, to, fromAmount, toAmount).toJson();
    this.wsOrderService.send(order);

    return this.dataSubject.asObservable();
  }

  public getActiveOrders() {
    return this.http.get(environment.orderApi + "/orders/getActiveOrders")
      .map(resp => resp.json());
  }
}
