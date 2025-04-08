import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllObservationReportsComponent } from './all-observation-reports.component';

describe('AllObservationReportsComponent', () => {
  let component: AllObservationReportsComponent;
  let fixture: ComponentFixture<AllObservationReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllObservationReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllObservationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
