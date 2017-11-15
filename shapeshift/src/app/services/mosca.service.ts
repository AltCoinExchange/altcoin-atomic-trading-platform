import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

declare const mqtt;

@Injectable()
export class MoscaService {
  client;

  messages: Subject<any> = new Subject();

  constructor() {
    this.client = mqtt.connect({host: '34.215.58.192', port: 3000});
    this.client.on('message', (topic, message) => {
      this.messages.next({topic, message: message.toString()})
    });
  }

  sendMsg(topic, data) {
    this.client.publish(topic, data);
  }

  subscribeToTopic(topic) {
    this.client.subscribe(topic);
  }

  onMessage(topic) {
    return this.messages.filter(data => data.topic === topic);
  }

}
