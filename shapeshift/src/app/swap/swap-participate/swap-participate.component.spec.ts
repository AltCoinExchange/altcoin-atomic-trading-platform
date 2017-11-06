import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapParticipateComponent } from './swap-participate.component';

describe('SwapParticipateComponent', () => {
  let component: SwapParticipateComponent;
  let fixture: ComponentFixture<SwapParticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapParticipateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
