import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPredatorsComponent } from './all-predators.component';

describe('AllPredatorsComponent', () => {
  let component: AllPredatorsComponent;
  let fixture: ComponentFixture<AllPredatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPredatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPredatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
