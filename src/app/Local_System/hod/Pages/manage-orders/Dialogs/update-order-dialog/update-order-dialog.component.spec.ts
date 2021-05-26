import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderDialogComponent } from './update-order-dialog.component';

describe('UpdateOrderDialogComponent', () => {
  let component: UpdateOrderDialogComponent;
  let fixture: ComponentFixture<UpdateOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
