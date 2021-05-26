import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesuppliesComponent } from './managesupplies.component';

describe('ManagesuppliesComponent', () => {
  let component: ManagesuppliesComponent;
  let fixture: ComponentFixture<ManagesuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
