import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
  standalone: true,
  imports:[
    CommonModule
  ]
})
export class EditContactComponent {

  constructor(public dialogRef: MatDialogRef<EditContactComponent>){}
  contact!: Contact;

}
