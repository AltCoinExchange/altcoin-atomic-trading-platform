import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapCompleteComponent } from './swap-complete.component';

describe('SwapCompleteComponent', () => {
  let component: SwapCompleteComponent;
  let fixture: ComponentFixture<SwapCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
