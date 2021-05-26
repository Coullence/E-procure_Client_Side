import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePurchaseOrderComponent } from './place-purchase-order.component';

describe('PlacePurchaseOrderComponent', () => {
  let component: PlacePurchaseOrderComponent;
  let fixture: ComponentFixture<PlacePurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
