import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, type Observable, of } from "rxjs";
import {
	Contact,
	ContactRequest,
	ContactResponse,
	ContactResponseAPI,
} from "../../shared/models/contact.model";
import { ScrumApiService } from "../scrum-api.service";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const CONTACTS_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/contact/contacts/`;

@Injectable({
	providedIn: "root",
})
export class ScrumContactsService {
	private http = inject(HttpClient);
	private scrumApi = inject(ScrumApiService);

	contactsEndpoint = CONTACTS_ENDPOINT;

	getContacts$(): Observable<ContactResponse[]> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http
			.get<ContactResponseAPI[]>(this.contactsEndpoint, options)
			.pipe(
				map((contacts: ContactResponseAPI[]) =>
					contacts.map((c) => Contact.createInternalValue(c)),
				),
				catchError(() => of([])),
			);
	}

	addContact$(
		contact: Partial<ContactRequest>,
	): Observable<ContactResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		const newContact = Contact.createRepresentation(contact);
		return this.http
			.post<ContactResponseAPI>(this.contactsEndpoint, newContact, options)
			.pipe(
				map((contact: ContactResponseAPI | null) =>
					contact ? Contact.createInternalValue(contact) : null,
				),
				catchError(() => of(null)),
			);
	}

	editContact$(
		contact: Partial<ContactRequest>,
		contactId: number,
	): Observable<ContactResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		const editContact = Contact.createRepresentation(contact);
		return this.http
			.patch<ContactResponseAPI>(
				`${this.contactsEndpoint + contactId}/`,
				editContact,
				options,
			)
			.pipe(
				map((contact: ContactResponseAPI | null) =>
					contact ? Contact.createInternalValue(contact) : null,
				),
				catchError(() => of(null)),
			);
	}

	deleteContact$(contactId: number): Observable<boolean> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http
			.delete<number>(`${this.contactsEndpoint + contactId}/`, options)
			.pipe(
				map(() => true),
				catchError(() => of(false)), // TODO: the error is swallowed, show feedback
			);
	}
}
