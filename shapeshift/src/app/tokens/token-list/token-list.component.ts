import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-token-list",
  templateUrl: "./token-list.component.html",
  styleUrls: ["./token-list.component.scss"]
})
export class TokenListComponent implements OnInit {

  tokens = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];

  tokenPreview = [];

  constructor() {
    while (this.tokens.length) {
      this.tokenPreview.push(this.tokens.splice(0, 4));
    }
  }

  ngOnInit() {
  }

}
