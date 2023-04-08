import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Contact, ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { ComponentType } from '@angular/cdk/portal';
import { EditContactComponent } from 'src/app/shared/shared-components/dialogs/edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    PageTitleComponent,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ContactsComponent {

  contacts$!: Observable<Contact[]>;

  constructor(private scrumContacts: ScrumContactsService,
    public dialog: MatDialog){
    this.contacts$ = this.scrumContacts.getContacts$();
  }

  addContact(){
    const dialogRef = this.openDialog(AddContactComponent);
  }

  editContact(contactToEdit: Contact){
    const dialogRef = this.openDialog(EditContactComponent);
    dialogRef.componentInstance.contact = contactToEdit;
  }

  openDialog(component : ComponentType<any>){
    return this.dialog.open(component);
  }

}
