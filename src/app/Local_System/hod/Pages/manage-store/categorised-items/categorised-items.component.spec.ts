import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorisedItemsComponent } from './categorised-items.component';

describe('CategorisedItemsComponent', () => {
  let component: CategorisedItemsComponent;
  let fixture: ComponentFixture<CategorisedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorisedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorisedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
