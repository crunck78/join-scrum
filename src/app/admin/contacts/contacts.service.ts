import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumContactsService } from "../../scrum-api/scrum-contacts/scrum-contacts.service";
import { ContactResponse } from "../../shared/models/contact.model";
import { AddContactComponent } from "../../shared/shared-components/dialogs/add-contact/add-contact.component";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class ContactsService {
	private scrumContacts = inject(ScrumContactsService);
	private dialog = inject(MatDialog);
	private breakPoints = inject(BreakpointsService);

	get matchWebBreakpoint$() {
		return this.breakPoints.matchesWebBreakpoint$;
	}

	get contacts$() {
		return this.scrumContacts.getContacts$().pipe(take(1));
	}

	openAddContactDialog() {
		const dialogRef = this.dialog.open<
			AddContactComponent,
			any,
			ContactResponse | null
		>(AddContactComponent);
		return dialogRef.afterClosed().pipe(take(1));
	}

	deleteContact$(contactToDeleteId: number) {
		return this.scrumContacts.deleteContact$(contactToDeleteId).pipe(take(1));
	}
}
