import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTradesComponent } from './active-trades.component';

describe('ActiveTradesComponent', () => {
  let component: ActiveTradesComponent;
  let fixture: ComponentFixture<ActiveTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
