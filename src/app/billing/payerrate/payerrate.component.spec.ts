import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerrateComponent } from './payerrate.component';

describe('PayerrateComponent', () => {
  let component: PayerrateComponent;
  let fixture: ComponentFixture<PayerrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayerrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
