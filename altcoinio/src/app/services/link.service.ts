import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {assembleLink} from "../common/link-util";


@Injectable()
export class LinkService {

  public generateLink(coins, wallet): Observable<string> {
    const address = wallet[
      coins.receiveCoin.derive === undefined ? coins.receiveCoin.name : coins.receiveCoin.derive
      ].address;
    const link = assembleLink(
      coins.depositCoin.name,
      coins.depositCoin.amount,
      coins.receiveCoin.name,
      coins.receiveCoin.amount,
      address,
      new Date(),
    );
    return Observable.of(link);
  }

  public generateAddress(coins, wallet): string {
    const address = wallet[
      coins.receiveCoin.derive === undefined ? coins.receiveCoin.name : coins.receiveCoin.derive
      ].address;
    return address;
  }

  public generateAddressForCoin(coin, wallet): string {
    if (coin.name == "BTC") {
      return wallet["BTC"].address;
    } else {
      return wallet["ETH"].address;
    }
  }
}
