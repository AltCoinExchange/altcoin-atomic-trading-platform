import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapInitiateComponent } from './swap-initiate.component';

describe('SwapInitiateComponent', () => {
  let component: SwapInitiateComponent;
  let fixture: ComponentFixture<SwapInitiateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapInitiateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
