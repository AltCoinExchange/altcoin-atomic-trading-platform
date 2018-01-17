import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsWalletComponent } from './transactions-wallet.component';

describe('TransactionsWalletComponent', () => {
  let component: TransactionsWalletComponent;
  let fixture: ComponentFixture<TransactionsWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
