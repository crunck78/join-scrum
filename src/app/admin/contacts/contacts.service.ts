import { Injectable } from "@angular/core";
import type { MatDialog } from "@angular/material/dialog";
import type { ScrumContactsService } from "src/app/scrum-api/scrum-contacts/scrum-contacts.service";
import type { BreakpointsService } from "src/app/shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class ContactsService {
	constructor(
		public scrumContacts: ScrumContactsService,
		public dialog: MatDialog,
		public breakPoints: BreakpointsService,
	) {}

	get contacts$() {
		return this.scrumContacts.getContacts$();
	}
}
