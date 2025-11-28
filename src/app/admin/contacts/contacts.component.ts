import { Component, type ElementRef, inject, ViewChild } from "@angular/core";

import { type Observable, take } from "rxjs";
import { ContactResponse } from "../../shared/models/contact.model";
import { AddContactComponent } from "../../shared/shared-components/dialogs/add-contact/add-contact.component";
import { ContactsModule } from "./contacts.module";
import { ContactsService } from "./contacts.service";
@Component({
	selector: "app-contacts",
	templateUrl: "./contacts.component.html",
	styleUrls: ["./contacts.component.scss"],
	imports: [ContactsModule],
})
export class ContactsComponent {
	private contactsService = inject(ContactsService);

	@ViewChild("contacts-list") contactsList!: ElementRef<HTMLElement>;

	contacts$!: Observable<ContactResponse[] | undefined>;
	selectedContact!: ContactResponse | null;

	constructor() {
		this.updateContacts();
	}

	get matchWebBreakpoint$() {
		return this.contactsService.breakPoints.matchesWebBreakpoint$;
	}

	addContact() {
		const dialogRef = this.contactsService.dialog.open(AddContactComponent);
		dialogRef.afterClosed().subscribe((newContact) => {
			if (newContact) {
				this.updateContacts();
			}
		});
	}

	alreadyExists(letter: string) {
		return document.getElementById(`contacts-${letter}`);
	}

	updateContacts() {
		this.contacts$ = this.contactsService.contacts$;
	}

	closeSelectedContact() {
		this.selectedContact = null;
	}

	deleteContact(contactToDelete: Partial<ContactResponse>) {
		this.contactsService.scrumContacts
			.deleteContact$(contactToDelete)
			.pipe(take(1))
			.subscribe((deleted: boolean) => {
				if (!deleted) return;
				this.selectedContact = null;
				this.updateContacts();
			});
	}
}
