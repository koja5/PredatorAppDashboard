import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProvincesComponent } from './all-provinces.component';

describe('AllProvincesComponent', () => {
  let component: AllProvincesComponent;
  let fixture: ComponentFixture<AllProvincesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProvincesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
