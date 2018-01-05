import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  links;

  constructor() {
    this.links = [
      {name: 'Blog', icon: 'fa fa-file-text-o', url: 'https://blog.altcoin.io/'},
      {name: 'FAQ', icon: 'fa fa-question-circle-o', url: 'https://blog.altcoin.io/atomic-swap-wallet-beta-release-b6e3eef55842'},
      {name: 'Twitter', icon: 'fa fa-twitter', url: 'https://twitter.com/altcoin_io'},
      {name: 'Telegram', icon: 'fa fa-telegram', url: 'https://t.me/altcoinexchange'},
      {name: 'Contact', icon: 'fa fa-envelope-o', url: 'mailto:support@altcoin.io'},
    ];
  }

  ngOnInit() {
    
  }

}