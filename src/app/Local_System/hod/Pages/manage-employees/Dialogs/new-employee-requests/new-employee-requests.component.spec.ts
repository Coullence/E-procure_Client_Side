import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeRequestsComponent } from './new-employee-requests.component';

describe('NewEmployeeRequestsComponent', () => {
  let component: NewEmployeeRequestsComponent;
  let fixture: ComponentFixture<NewEmployeeRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmployeeRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
