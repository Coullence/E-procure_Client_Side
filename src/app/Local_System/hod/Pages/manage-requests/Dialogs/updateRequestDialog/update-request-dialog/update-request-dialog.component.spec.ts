import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestDialogComponent } from './update-request-dialog.component';

describe('UpdateRequestDialogComponent', () => {
  let component: UpdateRequestDialogComponent;
  let fixture: ComponentFixture<UpdateRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
