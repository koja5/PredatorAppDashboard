import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormDataReportComponent } from './new-form-data-report.component';

describe('NewFormDataReportComponent', () => {
  let component: NewFormDataReportComponent;
  let fixture: ComponentFixture<NewFormDataReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormDataReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFormDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
