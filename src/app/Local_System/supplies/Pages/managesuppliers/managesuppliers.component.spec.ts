import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesuppliersComponent } from './managesuppliers.component';

describe('ManagesuppliersComponent', () => {
  let component: ManagesuppliersComponent;
  let fixture: ComponentFixture<ManagesuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
