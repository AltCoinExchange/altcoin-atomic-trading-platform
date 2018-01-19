import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-token-preview',
  templateUrl: './token-preview.component.html',
  styleUrls: ['./token-preview.component.scss']
})
export class TokenPreviewComponent implements OnInit {
  @Input() token;

  constructor() { }

  ngOnInit() {
  }

}
