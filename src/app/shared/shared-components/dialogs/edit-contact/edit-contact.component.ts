import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { ContactRequest } from 'src/app/shared/models/contact.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { LogoComponent } from '../../logo/logo.component';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    LogoComponent,
    MaterialModule,
    FormFieldComponent,
    ReactiveFormsModule,
  ]
})
export class EditContactComponent {
  editContactForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
  });

  contactToEdit!: number;

  constructor(public dialogRef: MatDialogRef<EditContactComponent>,
    private scrumContacts: ScrumContactsService) { }


  editContact() {
    if (this.editContactForm.valid) {
      this.scrumContacts.editContact$(
        this.editContactForm.value as Partial<ContactRequest>,
        this.contactToEdit).subscribe(res => this.dialogRef.close(res));
    }
  }

}
