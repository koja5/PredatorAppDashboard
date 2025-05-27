import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFishDistrictsComponent } from './all-fish-districts.component';

describe('AllFishDistrictsComponent', () => {
  let component: AllFishDistrictsComponent;
  let fixture: ComponentFixture<AllFishDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFishDistrictsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFishDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
