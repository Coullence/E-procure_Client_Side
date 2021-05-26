import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindTenderComponent } from './bind-tender.component';

describe('BindTenderComponent', () => {
  let component: BindTenderComponent;
  let fixture: ComponentFixture<BindTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
