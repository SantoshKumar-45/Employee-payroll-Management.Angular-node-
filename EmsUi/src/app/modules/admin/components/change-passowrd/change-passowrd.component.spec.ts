import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassowrdComponent } from './change-passowrd.component';

describe('ChangePassowrdComponent', () => {
  let component: ChangePassowrdComponent;
  let fixture: ComponentFixture<ChangePassowrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassowrdComponent]
    });
    fixture = TestBed.createComponent(ChangePassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
