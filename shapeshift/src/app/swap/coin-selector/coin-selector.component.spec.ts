import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSelectorComponent } from './coin-selector.component';

describe('CoinSelectorComponent', () => {
  let component: CoinSelectorComponent;
  let fixture: ComponentFixture<CoinSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
