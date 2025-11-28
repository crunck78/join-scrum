import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class ContactsService {
	scrumContacts = inject(ScrumContactsService);
	dialog = inject(MatDialog);
	breakPoints = inject(BreakpointsService);

	get contacts$() {
		return this.scrumContacts.getContacts$();
	}
}
