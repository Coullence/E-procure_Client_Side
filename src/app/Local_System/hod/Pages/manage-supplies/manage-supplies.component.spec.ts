import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuppliesComponent } from './manage-supplies.component';

describe('ManageSuppliesComponent', () => {
  let component: ManageSuppliesComponent;
  let fixture: ComponentFixture<ManageSuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
