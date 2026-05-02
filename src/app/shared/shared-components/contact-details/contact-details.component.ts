import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import type { ContactResponse } from "../../models/contact.model";
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { AddTaskDialogComponent } from "../dialogs/add-task-dialog/add-task-dialog.component";
import { EditContactComponent } from "../dialogs/edit-contact/edit-contact.component";
import { EmailLinkComponent } from "../email-link/email-link.component";

@Component({
	selector: "app-contact-details",
	templateUrl: "./contact-details.component.html",
	styleUrls: ["./contact-details.component.scss"],
	imports: [ContactCardComponent, MatButtonModule, EmailLinkComponent],
})
export class ContactDetailsComponent {
	private dialog = inject(MatDialog);

	@Input() contact!: ContactResponse;
	@Output() contactChange = new EventEmitter<ContactResponse>();

	editContact() {
		const dialogRef = this.dialog.open(EditContactComponent);
		dialogRef.componentInstance.contactToEdit = this.contact?.id ?? -1;
		dialogRef.componentInstance.editContactForm.patchValue(
			this.contact as ContactResponse,
		);

		dialogRef.afterClosed().subscribe((res) => {
			if (res) this.contact = res;
			this.contactChange.emit(res);
		});
	}

	addToTask() {
		const dialogRef = this.dialog.open(AddTaskDialogComponent);
		dialogRef.componentInstance.predefinedTaskRequest = {
			assignees: [this.contact.id],
		};
	}
}
