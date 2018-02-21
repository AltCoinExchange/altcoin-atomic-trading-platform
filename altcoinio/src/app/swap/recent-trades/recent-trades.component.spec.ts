import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTradesComponent } from './recent-trades.component';

describe('RecentTradesComponent', () => {
  let component: RecentTradesComponent;
  let fixture: ComponentFixture<RecentTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
