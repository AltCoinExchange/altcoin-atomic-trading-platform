import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapInitiateFieldsComponent } from './swap-initiate-fields.component';

describe('SwapInitiateFieldsComponent', () => {
  let component: SwapInitiateFieldsComponent;
  let fixture: ComponentFixture<SwapInitiateFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapInitiateFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapInitiateFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
