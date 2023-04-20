import { Injectable } from '@angular/core';
import { CONTACTS_ENDPOINT, ContactAPI } from './contacts-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, map, of } from 'rxjs';

export interface Contact {
  id: number,
  name: string,
  email: string,
  phone_number: string,
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

    return this.http.post<Contact>(this.contactsEndpoint, newContact, { headers })
    .pipe(catchError(error => of(undefined)));
  }

  editContact$(contact: Partial<Contact>, contactId: number){
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.patch<Partial<Contact>>(`${this.contactsEndpoint}/${contactId}/`, contact, {headers})
    .pipe(catchError(error => of(undefined)));
  }
}
