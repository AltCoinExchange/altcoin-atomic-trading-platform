
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPreviewComponent } from './token-preview.component';
import {AltcoinIoCommonModule} from "../../common/common.module";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {QuoteService} from "../../services/quote.service";
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MatCard, MatCardModule} from '@angular/material';
import {BtcCoinModel} from "../../models/coins/btc-coin.model";


describe('TokenPreviewComponent', () => {
  let component: TokenPreviewComponent;
  let fixture: ComponentFixture<TokenPreviewComponent>;
  let originalTimeout;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ TokenPreviewComponent ],
      imports: [
        CommonModule,
        AltcoinIoCommonModule,
        FlexLayoutModule,
        NgxChartsModule,
        MatCardModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        QuoteService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenPreviewComponent);
    component = fixture.componentInstance;
    component.token = new BtcCoinModel();
    spyOn(component, "ngOnInit");
    fixture.detectChanges();
  }));

  // beforeEach(() => {
  //   originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  //
  //   fixture = TestBed.createComponent(TokenPreviewComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create',() => {
    expect(component).toBeTruthy();
  }, 60000);
});
