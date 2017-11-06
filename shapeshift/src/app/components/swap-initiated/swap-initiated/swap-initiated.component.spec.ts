import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapInitiatedComponent } from './swap-initiated.component';

describe('SwapInitiatedComponent', () => {
  let component: SwapInitiatedComponent;
  let fixture: ComponentFixture<SwapInitiatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapInitiatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapInitiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
