import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { LogoComponent } from '../../logo/logo.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { ScrumContactsService, Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    LogoComponent,
    MatDialogModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
  ]
})
export class AddContactComponent {

  addContactForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
  })

  constructor(public dialogRef: MatDialogRef<AddContactComponent>,
    private scrumContacts: ScrumContactsService){}

  addContact(){
    if(this.addContactForm.valid){
      console.log("Adding Contact");
      const newContact = this.addContactForm.value;
      this.scrumContacts.addContact$(newContact as Contact).subscribe(
        {
          next: (res)=> this.dialogRef.close(res),
          error: (err) => console.log(err)
        }
      );
    }
  }

}
