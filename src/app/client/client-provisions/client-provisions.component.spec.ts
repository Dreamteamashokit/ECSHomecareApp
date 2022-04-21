import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProvisionsComponent } from './client-provisions.component';

describe('ClientProvisionsComponent', () => {
  let component: ClientProvisionsComponent;
  let fixture: ComponentFixture<ClientProvisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProvisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
