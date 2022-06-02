import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockinoutComponent } from './clockinout.component';

describe('ClockinoutComponent', () => {
  let component: ClockinoutComponent;
  let fixture: ComponentFixture<ClockinoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockinoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockinoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
