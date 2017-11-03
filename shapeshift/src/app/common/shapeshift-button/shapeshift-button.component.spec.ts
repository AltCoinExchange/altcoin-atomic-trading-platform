import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeshiftButtonComponent } from './shapeshift-button.component';

describe('ShapeshiftButtonComponent', () => {
  let component: ShapeshiftButtonComponent;
  let fixture: ComponentFixture<ShapeshiftButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeshiftButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeshiftButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
