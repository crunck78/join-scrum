import { Injectable } from '@angular/core';
import { CONTACTS_ENDPOINT, ContactAPI } from './contacts-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, of } from 'rxjs';

export interface Contact {
  name: string,
  email: string,
  phoneNumber: string,
  image?: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumContactsService {

  contactsEndpoint = CONTACTS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getContacts$() {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<Contact[]>(this.contactsEndpoint, { headers })
      .pipe(catchError(error => of<Contact[]>([])));
  }

  addContact$(newContact: Contact) {

    const serializedContact: ContactAPI = {
      name: newContact.name,
      email: newContact.email,
      phone_number: newContact.phoneNumber
    };

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.post<Contact>(this.contactsEndpoint, serializedContact, { headers })
    .pipe(catchError(error => of(undefined)));
  }
}
