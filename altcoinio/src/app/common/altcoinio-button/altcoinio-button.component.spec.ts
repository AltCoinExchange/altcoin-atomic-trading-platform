import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinioButtonComponent } from './altcoinio-button.component';

describe('AltcoinioButtonComponent', () => {
  let component: AltcoinioButtonComponent;
  let fixture: ComponentFixture<AltcoinioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
