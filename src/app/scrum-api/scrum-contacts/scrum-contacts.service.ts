import { Injectable } from '@angular/core';
import { CONTACTS_ENDPOINT } from './contacts-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Contact, ContactRequest, ContactRequestAPI, ContactResponse, ContactResponseAPI } from 'src/app/shared/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ScrumContactsService {

  contactsEndpoint = CONTACTS_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getContacts$(): Observable<ContactResponse[]> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<ContactResponseAPI[]>(this.contactsEndpoint, { headers })
      .pipe(
        catchError(error => of([])),
        map((contacts: ContactResponseAPI[]) => contacts.map(c => Contact.createInternalValue(c)))
      );
  }

  addContact$(contact: Partial<ContactRequest>): Observable<ContactResponse | null> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const newContact = Contact.createRepresentation(contact);

    return this.http.post<ContactResponseAPI>(this.contactsEndpoint, newContact, { headers })
      .pipe(
        catchError(error => of(null)),
        map((contact: ContactResponseAPI | null) => contact ? Contact.createInternalValue(contact) : null)
      );
  }

  editContact$(contact: Partial<ContactRequest>, contactId: number): Observable<ContactResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    const editContact = Contact.createRepresentation(contact);

    return this.http.patch<ContactResponseAPI>(`${this.contactsEndpoint}/${contactId}/`, editContact, { headers })
      .pipe(
        catchError(error => of(null)),
        map((contact: ContactResponseAPI | null) => contact ? Contact.createInternalValue(contact) : null)
      );
  }

  deleteContact$(contact: Partial<ContactResponse>): any {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.delete<ContactResponseAPI>(`${this.contactsEndpoint}/${contact.id}/`, { headers })
      .pipe(
        catchError(error => of(false)),
        map(()=> of(true))
      );
  }


}
