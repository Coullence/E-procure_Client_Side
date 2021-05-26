import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountDialogComponent } from './update-account-dialog.component';

describe('UpdateAccountDialogComponent', () => {
  let component: UpdateAccountDialogComponent;
  let fixture: ComponentFixture<UpdateAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
