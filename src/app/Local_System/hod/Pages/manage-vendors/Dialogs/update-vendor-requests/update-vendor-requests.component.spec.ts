import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVendorRequestsComponent } from './update-vendor-requests.component';

describe('UpdateVendorRequestsComponent', () => {
  let component: UpdateVendorRequestsComponent;
  let fixture: ComponentFixture<UpdateVendorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVendorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVendorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
