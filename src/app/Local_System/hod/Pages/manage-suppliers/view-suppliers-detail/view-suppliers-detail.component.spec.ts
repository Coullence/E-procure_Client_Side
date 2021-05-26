import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuppliersDetailComponent } from './view-suppliers-detail.component';

describe('ViewSuppliersDetailComponent', () => {
  let component: ViewSuppliersDetailComponent;
  let fixture: ComponentFixture<ViewSuppliersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSuppliersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSuppliersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
