import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditMassiveComponent } from './modal-edit-massive.component';

describe('ModalEditMassiveComponent', () => {
  let component: ModalEditMassiveComponent;
  let fixture: ComponentFixture<ModalEditMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditMassiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
