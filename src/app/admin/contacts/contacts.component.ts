import {
	Component,
	type ElementRef,
	inject,
	OnInit,
	ViewChild,
} from "@angular/core";

import { ContactResponse } from "../../shared/models/contact.model";
import { ContactsModule } from "./contacts.module";
import { ContactsService } from "./contacts.service";
@Component({
	selector: "app-contacts",
	templateUrl: "./contacts.component.html",
	styleUrls: ["./contacts.component.scss"],
	imports: [ContactsModule],
})
export class ContactsComponent implements OnInit {
	private contactsService = inject(ContactsService);

	@ViewChild("contacts-list") contactsList!: ElementRef<HTMLElement>;

	contacts: ContactResponse[] = [];
	selectedContact!: ContactResponse | null;

	ngOnInit() {
		this.refreshContacts();
	}

	get matchWebBreakpoint$() {
		return this.contactsService.matchWebBreakpoint$;
	}

	refreshContacts() {
		this.contactsService.contacts$.subscribe(
			(contacts) => (this.contacts = contacts),
		);
	}

	addContact() {
		const dialogRefAfterClosed = this.contactsService.openAddContactDialog();
		dialogRefAfterClosed.subscribe((newContact) => {
			if (newContact) {
				this.refreshContacts();
			}
		});
	}

	closeSelectedContact() {
		this.selectedContact = null;
	}

	deleteContact(contactToDeleteId: number) {
		this.contactsService
			.deleteContact$(contactToDeleteId)
			.subscribe((deleted: boolean) => {
				if (!deleted) return;
				this.selectedContact = null;
				this.refreshContacts();
			});
	}
}
