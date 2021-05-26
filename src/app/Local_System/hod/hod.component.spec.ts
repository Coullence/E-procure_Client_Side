import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { hodComponent } from './hod.component';

describe('hodComponent', () => {
  let component: hodComponent;
  let fixture: ComponentFixture<hodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ hodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(hodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
