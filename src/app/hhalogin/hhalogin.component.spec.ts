import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HHALoginComponent } from './hhalogin.component';

describe('HHALoginComponent', () => {
  let component: HHALoginComponent;
  let fixture: ComponentFixture<HHALoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HHALoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HHALoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
