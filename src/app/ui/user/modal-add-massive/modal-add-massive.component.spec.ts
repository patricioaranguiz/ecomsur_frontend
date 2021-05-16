import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddMassiveComponent } from './modal-add-massive.component';

describe('ModalAddMassiveComponent', () => {
  let component: ModalAddMassiveComponent;
  let fixture: ComponentFixture<ModalAddMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddMassiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
