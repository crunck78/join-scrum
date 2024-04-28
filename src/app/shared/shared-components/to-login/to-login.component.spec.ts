import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToLoginComponent } from './to-login.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToLoginComponent', () => {
  let component: ToLoginComponent;
  let fixture: ComponentFixture<ToLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
