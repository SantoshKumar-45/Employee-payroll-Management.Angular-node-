import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryheadComponent } from './salaryhead.component';

describe('SalaryheadComponent', () => {
  let component: SalaryheadComponent;
  let fixture: ComponentFixture<SalaryheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryheadComponent]
    });
    fixture = TestBed.createComponent(SalaryheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
