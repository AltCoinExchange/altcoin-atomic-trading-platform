import {Injectable} from "@angular/core";

import * as mqtt from "mqtt";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {InitiateData, InitiateParams} from "altcoinio-wallet";
import {isString} from "util";
import {AREDEEM, PARTICIPATE} from "../actions/side-A.action";
import {BREDEEM} from "../actions/side-B.action";

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
    console.log(link);
    const topic = INITIATE + link.order_id;
    this.subscribeToTopic(topic);
    return this.onMessage(topic).map(msg => JSON.parse(msg.message));
  }

  public informInitiate(link, data: InitiateParams) {
    const topic = INITIATE + link.order_id;
    this.sendMsg(topic, isString(data) ? data : JSON.stringify(data));
    return Observable.of(true);
  }

  public waitForParticipate(link): Observable<InitiateData> {
    const topic = PARTICIPATE + link.order_id;
    this.subscribeToTopic(topic);
    return this.onMessage(topic).map(msg => JSON.parse(msg.message));
  }

  public informParticipate(link, data: InitiateParams) {
    const topic = PARTICIPATE + link.order_id;
    this.sendMsg(topic, isString(data) ? data : JSON.stringify(data));
    return Observable.of(true);
  }

  public waitForBRedeem(link): Observable<InitiateData> {
    const topic = BREDEEM + link.order_id;
    this.subscribeToTopic(topic);
    return this.onMessage(topic).map(msg => JSON.parse(msg.message));
  }

  public informBRedeem(link, data: InitiateParams) {
    const topic = BREDEEM + link.order_id;
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
