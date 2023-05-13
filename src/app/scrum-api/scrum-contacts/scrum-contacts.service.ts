import { Injectable } from '@angular/core';
import { CONTACTS_ENDPOINT, ContactAPI } from './contacts-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, map, of } from 'rxjs';

export interface Contact {
  id: number,
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

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newContactAPI = this.scrumApi.renameFields(newContact, ['phoneNumber'], ['phone_number']);

    return this.http.post<Contact>(this.contactsEndpoint, newContactAPI, { headers })
      .pipe(
        catchError(error => of(undefined)),
        map(value => this.scrumApi.renameFields(value, ['phone_number'], ['phoneNumber']))
      );
  }

  editContact$(contact: Partial<Contact>, contactId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const pathContactAPI = this.scrumApi.renameFields(contact, ['phoneNumber'], ['phone_number'])

    return this.http.patch<Partial<Contact>>(`${this.contactsEndpoint}/${contactId}/`, contact, { headers })
      .pipe(
        catchError(error => of(undefined)),
        map(value => this.scrumApi.renameFields(value, ['phone_number'], ['phoneNumber']))
      );
  }


}
