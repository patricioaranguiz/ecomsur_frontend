import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewDetailLogComponent } from './modal-view-detail-log.component';

describe('ModalViewDetailLogComponent', () => {
  let component: ModalViewDetailLogComponent;
  let fixture: ComponentFixture<ModalViewDetailLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewDetailLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewDetailLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
