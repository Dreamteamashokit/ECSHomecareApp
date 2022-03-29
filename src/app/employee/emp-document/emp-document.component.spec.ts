import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDocumentComponent } from './emp-document.component';

describe('EmpDocumentComponent', () => {
  let component: EmpDocumentComponent;
  let fixture: ComponentFixture<EmpDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
