// import { Injectable } from '@angular/core'
// import { QueueingSubject } from "queueing-subject";
// import { Observable } from "rxjs/Observable";
// import websocketConnect from "rxjs-websockets";
// import 'rxjs/add/operator/share'
//
// @Injectable()
// export class ServerSocket {
//   private inputStream: QueueingSubject<string>;
//   public messages: Observable<string>;
//
//   public connect() {
//     if (this.messages) {
//       return;
//     }
//
//     this.messages = websocketConnect(
//       'ws://127.0.0.1:3001/orders',
//       this.inputStream = new QueueingSubject<string>()
//     ).messages.share();
//   }
//
//   public send(message: string):void {
//     this.inputStream.next(message);
//   }
// }
