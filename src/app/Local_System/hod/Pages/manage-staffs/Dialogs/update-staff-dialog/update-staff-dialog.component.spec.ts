import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffDialogComponent } from './update-staff-dialog.component';

describe('UpdateStaffDialogComponent', () => {
  let component: UpdateStaffDialogComponent;
  let fixture: ComponentFixture<UpdateStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
