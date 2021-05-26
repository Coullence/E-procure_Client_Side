import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumWidgetComponent } from './breadcrum-widget.component';

describe('BreadcrumWidgetComponent', () => {
  let component: BreadcrumWidgetComponent;
  let fixture: ComponentFixture<BreadcrumWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
