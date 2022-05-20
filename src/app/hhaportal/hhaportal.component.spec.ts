import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HhaportalComponent } from './hhaportal.component';

describe('HhaportalComponent', () => {
  let component: HhaportalComponent;
  let fixture: ComponentFixture<HhaportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HhaportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HhaportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
