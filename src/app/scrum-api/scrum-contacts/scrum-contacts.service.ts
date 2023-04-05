import { Injectable } from '@angular/core';
import { CONTACTS_ENDPOINT } from './contacts-interceptor.service';
import { HttpClient } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, of } from 'rxjs';

export interface Contact {
  name: string,
  email: string,
  phone: string,
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumContactsService {

  contactsEndpoint = CONTACTS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getContacts$() {
    return this.http.get<Contact[]>(this.contactsEndpoint)
      .pipe(catchError(error => of<Contact[]>([])));
  }
}
