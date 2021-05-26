import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderRequestsComponent } from './tender-requests.component';

describe('TenderRequestsComponent', () => {
  let component: TenderRequestsComponent;
  let fixture: ComponentFixture<TenderRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
