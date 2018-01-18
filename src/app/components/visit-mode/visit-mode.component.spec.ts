import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitModeComponent } from './visit-mode.component';

describe('VisitModeComponent', () => {
  let component: VisitModeComponent;
  let fixture: ComponentFixture<VisitModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
