import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdminsComponent } from './my-admins.component';

describe('MyAdminsComponent', () => {
  let component: MyAdminsComponent;
  let fixture: ComponentFixture<MyAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
