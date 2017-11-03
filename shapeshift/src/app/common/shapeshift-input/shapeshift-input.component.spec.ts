import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeshiftInputComponent } from './shapeshift-input.component';

describe('ShapeshiftInputComponent', () => {
  let component: ShapeshiftInputComponent;
  let fixture: ComponentFixture<ShapeshiftInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeshiftInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeshiftInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
