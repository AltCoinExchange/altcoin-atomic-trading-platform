import {Injectable} from "@angular/core";

import * as mqtt from "mqtt";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {InitiateData, InitiateParams} from "ts-wallet";
import {isString} from "util";

const INITIATE = "/inititate/";

@Injectable()
export class MoscaService {
  client;

  messages: Subject<any> = new Subject();

  constructor() {
    this.client = mqtt.connect("wss://swap.altcoin.io:3001/");
    this.client.on("message", (topic, message) => {
      this.messages.next({topic, message: message.toString()});
    });
  }

  public waitForInitiate(link): Observable<InitiateData> {
    const topic = INITIATE + link.replace('=', '').replace('=', '');
    this.subscribeToTopic(topic);
    return this.onMessage(topic).map(msg => JSON.parse(msg.message));
  }

  public informInitiate(link, data: InitiateParams) {
    const topic = INITIATE + link.replace('=', '').replace('=', '');
    this.sendMsg(topic, isString(data) ? data : JSON.stringify(data));
    return Observable.of(true);
  }

  private sendMsg(topic, data) {
    this.client.publish(topic, data);
  }

  private subscribeToTopic(topic) {
    this.client.subscribe(topic);
  }

  private onMessage(topic) {
    return this.messages.filter(data => data.topic === topic);
  }

}
