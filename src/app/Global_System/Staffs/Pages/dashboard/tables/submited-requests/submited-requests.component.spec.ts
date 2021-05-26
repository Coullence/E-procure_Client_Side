import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedRequestsComponent } from './submited-requests.component';

describe('SubmitedRequestsComponent', () => {
  let component: SubmitedRequestsComponent;
  let fixture: ComponentFixture<SubmitedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
