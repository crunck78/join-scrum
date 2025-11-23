import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumContactsService } from "src/app/scrum-api/scrum-contacts/scrum-contacts.service";
import type { ContactRequest } from "src/app/shared/models/contact.model";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { requireAtLeastOne } from "src/app/shared/utils/custom-validators";
import { DialogComponent } from "../../dialog/dialog.component";
import { FormFieldComponent } from "../../form-field/form-field.component";
@Component({
	selector: "app-edit-contact",
	templateUrl: "./edit-contact.component.html",
	styleUrls: ["./edit-contact.component.scss"],
	imports: [
		DialogComponent,
		MaterialModule,
		FormFieldComponent,
		ReactiveFormsModule,
	],
})
export class EditContactComponent {
	dialogRef = inject<MatDialogRef<EditContactComponent>>(MatDialogRef);
	private scrumContacts = inject(ScrumContactsService);

	editContactForm = new FormGroup(
		{
			name: new FormControl(""),
			email: new FormControl("", Validators.compose([Validators.email])),
			phoneNumber: new FormControl(""),
		},
		{ validators: requireAtLeastOne(["name", "email", "phoneNumber"]) },
	);

	contactToEdit!: number;

	editContact() {
		if (this.editContactForm.valid) {
			this.scrumContacts
				.editContact$(
					this.editContactForm.value as Partial<ContactRequest>,
					this.contactToEdit,
				)
				.pipe(take(1))
				.subscribe((res) => this.dialogRef.close(res));
		}
	}
}
