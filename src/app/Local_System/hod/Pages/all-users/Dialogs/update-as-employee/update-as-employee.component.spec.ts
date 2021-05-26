import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAsEmployeeComponent } from './update-as-employee.component';

describe('UpdateAsEmployeeComponent', () => {
  let component: UpdateAsEmployeeComponent;
  let fixture: ComponentFixture<UpdateAsEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAsEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
