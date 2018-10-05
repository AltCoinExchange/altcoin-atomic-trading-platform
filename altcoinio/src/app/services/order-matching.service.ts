import { Injectable } from '@angular/core'
import { QueueingSubject } from "queueing-subject";
import { Observable } from "rxjs/Observable";
import websocketConnect from "rxjs-websockets";
import 'rxjs/add/operator/share'
import {environment} from "../../environments/environment";

@Injectable()
export class OrderMatchingService {
  private inputStream: QueueingSubject<string>;
  public messages: Observable<string>;

  public connect() {
    if (this.messages) {
      return;
    }

    this.messages = websocketConnect(
      environment.wsOrderApi + '/orders',
      this.inputStream = new QueueingSubject<string>()
    ).messages.share();
  }

  public send(message: string):void {
    this.inputStream.next(message);
  }
}
