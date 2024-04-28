import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkComponent } from './router-link.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../routes';

describe('RouterLinkComponent', () => {
  let component: RouterLinkComponent;
  let fixture: ComponentFixture<RouterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
