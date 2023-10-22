import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInitialsComponent } from './contact-initials.component';

describe('ContactInitialsComponent', () => {
  let component: ContactInitialsComponent;
  let fixture: ComponentFixture<ContactInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInitialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
