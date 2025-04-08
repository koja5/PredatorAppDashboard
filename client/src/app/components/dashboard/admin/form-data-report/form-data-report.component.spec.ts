import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataReportComponent } from './form-data-report.component';

describe('FormDataReportComponent', () => {
  let component: FormDataReportComponent;
  let fixture: ComponentFixture<FormDataReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
