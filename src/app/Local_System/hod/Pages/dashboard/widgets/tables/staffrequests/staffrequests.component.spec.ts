import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffrequestsComponent } from './staffrequests.component';

describe('StaffrequestsComponent', () => {
  let component: StaffrequestsComponent;
  let fixture: ComponentFixture<StaffrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
