import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
})
export class SwapInitiateComponent implements OnInit {
  private routeSub: Subscription;

  private data: any;//todo create interface

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      const stringified = atob(link);
      this.data = JSON.parse(stringified);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
  }

}
