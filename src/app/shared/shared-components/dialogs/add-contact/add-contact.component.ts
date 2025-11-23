import { Component } from "@angular/core";
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
import { LogoComponent } from "../../logo/logo.component";

@Component({
	selector: "app-add-contact",
	templateUrl: "./add-contact.component.html",
	styleUrls: ["./add-contact.component.scss"],
	imports: [
		DialogComponent,
		ReactiveFormsModule,
		FormFieldComponent,
		LogoComponent,
		MaterialModule,
	],
})
export class AddContactComponent {
	addContactForm = new FormGroup(
		{
			name: new FormControl(""),
			email: new FormControl("", Validators.compose([Validators.email])),
			phoneNumber: new FormControl(""),
		},
		{ validators: requireAtLeastOne(["name", "email", "phoneNumber"]) },
	);

	constructor(
		public dialogRef: MatDialogRef<AddContactComponent>,
		private scrumContacts: ScrumContactsService,
	) {}

	addContact() {
		if (this.addContactForm.valid) {
			this.scrumContacts
				.addContact$(this.addContactForm.value as Partial<ContactRequest>)
				.pipe(take(1))
				.subscribe({
					next: (res) => this.dialogRef.close(res),
					error: (err) => console.log(err),
				});
		}
	}
}
