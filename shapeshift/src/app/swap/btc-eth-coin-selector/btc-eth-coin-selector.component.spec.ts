import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcEthCoinSelectorComponent } from './btc-eth-coin-selector.component';

describe('BtcEthCoinSelectorComponent', () => {
  let component: BtcEthCoinSelectorComponent;
  let fixture: ComponentFixture<BtcEthCoinSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtcEthCoinSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtcEthCoinSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
