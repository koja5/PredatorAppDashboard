import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDistrictsComponent } from './all-districts.component';

describe('AllDistrictsComponent', () => {
  let component: AllDistrictsComponent;
  let fixture: ComponentFixture<AllDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDistrictsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
