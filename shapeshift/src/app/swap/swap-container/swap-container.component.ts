import {Component, OnInit} from "@angular/core";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";


@Component({
  selector: "app-swap-container",
  templateUrl: "./swap-container.component.html",
  styleUrls: ["./swap-container.component.scss"]
})
export class SwapContainerComponent implements OnInit {
  displayedColumns = ["from", "to"];
  dataSource = new MyDataSource(ELEMENT_DATA);

  constructor() {

  }

  ngOnInit() {
  }

}

export interface Element {
  from: string;
  to: string;
  id: number;
  fromAmount: number;
  toAmount: number;
}

const ELEMENT_DATA: Element[] = [
  {id: 1, from: "BTC", to: "ETC", fromAmount: 1, toAmount: 3},
  {id: 1, from: "BTC", to: "ETC", fromAmount: 1, toAmount: 3},
  {id: 1, from: "BTC", to: "ETC", fromAmount: 1, toAmount: 3},
  {id: 1, from: "BTC", to: "ETC", fromAmount: 1, toAmount: 3},
  {id: 1, from: "BTC", to: "ETC", fromAmount: 1, toAmount: 3},
];


export class MyDataSource extends DataSource<any> {

  constructor(private element: Element[]) {
    super();
  }

  connect(): Observable<Element[]> {
    return Observable.of(this.element);
  }

  disconnect() {
  }
}
