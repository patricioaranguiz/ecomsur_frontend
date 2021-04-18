import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrHhComponent } from './rr-hh.component';

describe('RrHhComponent', () => {
  let component: RrHhComponent;
  let fixture: ComponentFixture<RrHhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrHhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrHhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
