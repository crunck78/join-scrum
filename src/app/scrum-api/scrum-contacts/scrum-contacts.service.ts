import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Contact,
	ContactRequest,
	ContactResponse,
	ContactResponseAPI,
} from "../../shared/models/contact.model";
export const CONTACTS_ENDPOINT = "/api/contact/contacts/";

@Injectable({
	providedIn: "root",
})
export class ScrumContactsService {
	private http = inject(HttpClient);

	contactsEndpoint = CONTACTS_ENDPOINT;

	getContacts$(): Observable<ContactResponse[]> {
		return this.http.get<ContactResponseAPI[]>(this.contactsEndpoint).pipe(
			map((contacts: ContactResponseAPI[]) =>
				contacts.map((c) => Contact.createInternalValue(c)),
			),
			catchError(() => of([])),
		);
	}

	addContact$(
		contact: Partial<ContactRequest>,
	): Observable<ContactResponse | null> {
		const newContact = Contact.createRepresentation(contact);
		return this.http
			.post<ContactResponseAPI>(this.contactsEndpoint, newContact)
			.pipe(
				map((contact) => Contact.createInternalValue(contact)),
				catchError(() => of(null)),
			);
	}

	editContact$(
		contact: Partial<ContactRequest>,
		contactId: number,
	): Observable<ContactResponse | null> {
		const editContact = Contact.createRepresentation(contact);
		return this.http
			.patch<ContactResponseAPI>(
				`${this.contactsEndpoint + contactId}/`,
				editContact,
			)
			.pipe(
				map((contact: ContactResponseAPI) =>
					Contact.createInternalValue(contact),
				),
				catchError(() => of(null)),
			);
	}

	deleteContact$(contactId: number): Observable<boolean> {
		return this.http.delete<void>(`${this.contactsEndpoint + contactId}/`).pipe(
			map(() => true),
			catchError(() => of(false)), // TODO: the error is swallowed, show feedback
		);
	}
}
