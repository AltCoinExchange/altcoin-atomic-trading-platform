import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
const uuidv4 = require("uuid/v4");

@Injectable()
export class OrderService {
  constructor(private http: Http) {

  }

  public placeOrder(from, to, fromAmount, toAmount, address) {
    const uniqueId = uuidv4().replace(/-/g, "");
    return this.http.get(environment.orderApi + "/order/" + uniqueId + `/${address}/${from}/${to}/${fromAmount}/${toAmount}`)
      .timeout(10000)
      .map(resp => resp.json());
  }

  public getActiveOrders() {
    return this.http.get(environment.orderApi + "/orders/getActiveOrders")
      .map(resp => resp.json());
  }
}
