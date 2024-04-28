import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSignUpComponent } from './to-sign-up.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../routes';

describe('ToSignUpComponent', () => {
  let component: ToSignUpComponent;
  let fixture: ComponentFixture<ToSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
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
