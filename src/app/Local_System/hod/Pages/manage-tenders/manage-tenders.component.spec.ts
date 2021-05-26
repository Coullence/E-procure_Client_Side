import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTendersComponent } from './manage-tenders.component';

describe('ManageTendersComponent', () => {
  let component: ManageTendersComponent;
  let fixture: ComponentFixture<ManageTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
