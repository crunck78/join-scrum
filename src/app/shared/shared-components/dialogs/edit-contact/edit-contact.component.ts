import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { LogoComponent } from '../../logo/logo.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { ScrumContactsService, Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    LogoComponent,
    MatDialogModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
  ]
})
export class EditContactComponent {
  editContactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<EditContactComponent>,
    private scrumContacts: ScrumContactsService) { }


  editContact() {
    if (this.editContactForm.valid) {
      console.log(this.editContactForm.value);
    }
  }

}
