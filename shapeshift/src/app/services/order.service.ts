import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
const uuidv4 = require("uuid/v4");

@Injectable()
export class OrderService {
  constructor(private http: Http) {

  }

  public placeOrder(from, to, amount, address) {
    const uniqueId = uuidv4().replace(/-/g, "");
    return this.http.get(environment.orderApi + "/order/" + uniqueId + `/${from}/${to}/${amount}/${address}`)
      .timeout(10000)
      .map(resp => resp.json());
  }

}
