import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployeeRequestComponent } from './get-employee-request.component';

describe('GetEmployeeRequestComponent', () => {
  let component: GetEmployeeRequestComponent;
  let fixture: ComponentFixture<GetEmployeeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmployeeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployeeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
