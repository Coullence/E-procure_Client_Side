import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcureAssetsComponent } from './procure-assets.component';

describe('ProcureAssetsComponent', () => {
  let component: ProcureAssetsComponent;
  let fixture: ComponentFixture<ProcureAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcureAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcureAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
