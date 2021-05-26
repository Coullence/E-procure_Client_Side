import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRequestsComponent } from './make-requests.component';

describe('MakeRequestsComponent', () => {
  let component: MakeRequestsComponent;
  let fixture: ComponentFixture<MakeRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
