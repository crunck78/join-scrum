import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ContactResponse } from '../../models/contact.model';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  const contact = {
    name: "MyContact",
    email: "mycontact@mail.com",
    phoneNumber: "000000"
  } as ContactResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    component.contact = contact;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
