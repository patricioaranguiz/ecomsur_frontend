import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteMassiveComponent } from './modal-delete-massive.component';

describe('ModalDeleteMassiveComponent', () => {
  let component: ModalDeleteMassiveComponent;
  let fixture: ComponentFixture<ModalDeleteMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteMassiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
