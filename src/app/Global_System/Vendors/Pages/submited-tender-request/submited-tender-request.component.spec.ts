import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedTenderRequestComponent } from './submited-tender-request.component';

describe('SubmitedTenderRequestComponent', () => {
  let component: SubmitedTenderRequestComponent;
  let fixture: ComponentFixture<SubmitedTenderRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitedTenderRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitedTenderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
