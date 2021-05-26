import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTenderRequestComponent } from './view-tender-request.component';

describe('ViewTenderRequestComponent', () => {
  let component: ViewTenderRequestComponent;
  let fixture: ComponentFixture<ViewTenderRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTenderRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTenderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
