import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ContactResponse, ContactResponseAPI, Contact, ContactRequest } from 'src/app/shared/models/contact.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const CONTACTS_ENDPOINT = SCRUM_API_ENDPOINT + '/api/contact/contacts/';

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
        catchError(() => of([])),
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
        catchError(() => of(null)),
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
        catchError(() => of(null)),
        map((contact: ContactResponseAPI | null) => contact ? Contact.createInternalValue(contact) : null)
      );
  }

  deleteContact$(contact: Partial<ContactResponse>): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.delete<number>(`${this.contactsEndpoint}/${contact.id}/`, { headers })
      .pipe(
        catchError(() => of(false)),
        map(()=> true)
      );
  }


}
