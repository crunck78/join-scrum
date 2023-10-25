import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToLoginComponent } from './to-login.component';

describe('ToLoginComponent', () => {
  let component: ToLoginComponent;
  let fixture: ComponentFixture<ToLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToLoginComponent ]
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
