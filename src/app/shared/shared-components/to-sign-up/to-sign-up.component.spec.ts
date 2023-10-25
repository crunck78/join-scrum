import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSignUpComponent } from './to-sign-up.component';

describe('ToSignUpComponent', () => {
  let component: ToSignUpComponent;
  let fixture: ComponentFixture<ToSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
