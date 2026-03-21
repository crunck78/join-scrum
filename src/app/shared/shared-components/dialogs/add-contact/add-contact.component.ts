import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { take } from "rxjs";
import { ScrumContactsService } from "../../../../scrum-api/scrum-contacts/scrum-contacts.service";
import { ContactRequest, ContactResponse } from "../../../models/contact.model";
import { MaterialModule } from "../../../modules/material/material.module";
import { requireAtLeastOne } from "../../../utils/custom-validators";
import { DialogComponent } from "../../dialog/dialog.component";
import { FormFieldComponent } from "../../form-field/form-field.component";

@Component({
	selector: "app-add-contact",
	templateUrl: "./add-contact.component.html",
	styleUrls: ["./add-contact.component.scss"],
	imports: [
		DialogComponent,
		ReactiveFormsModule,
		FormFieldComponent,
		MaterialModule,
	],
})
export class AddContactComponent {
	dialogRef =
		inject<MatDialogRef<AddContactComponent, ContactResponse | null>>(
			MatDialogRef,
		);
	private scrumContacts = inject(ScrumContactsService);

	addContactForm = new FormGroup(
		{
			name: new FormControl(""),
			email: new FormControl("", Validators.compose([Validators.email])),
			phoneNumber: new FormControl(""),
		},
		{ validators: requireAtLeastOne(["name", "email", "phoneNumber"]) },
	);

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
