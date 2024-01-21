import { Component, ElementRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { ContactsModule } from './contacts.module';
import { ContactsService } from './contacts.service';
import { ContactResponse } from 'src/app/shared/models/contact.model';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [ContactsModule]
})
export class ContactsComponent {

  @ViewChild('contacts-list') contactsList!: ElementRef<HTMLElement>;

  contacts$!: Observable<ContactResponse[] | undefined>;
  selectedContact!: ContactResponse | null;

  constructor(private contactsService: ContactsService) {
    this.updateContacts();
  }

  get matchWebBreakpoint$() {
    return this.contactsService.breakPoints.matchesWebBreakpoint$;
  }

  addContact() {
    const dialogRef = this.contactsService.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if (newContact) {
        this.updateContacts();
      }
    })
  }

  alreadyExists(letter: string) {
    return document.getElementById(`contacts-${letter}`);
  }

  updateContacts() {
    this.contacts$ = this.contactsService.scrumContacts.getContacts$();
  }

  closeSelectedContact() {
    this.selectedContact = null;
  }

  deleteContact(contactToDelete: Partial<ContactResponse>) {
    this.contactsService.scrumContacts.deleteContact$(contactToDelete).subscribe((deleted: boolean) => {
      if(deleted){
        this.selectedContact = null;
        this.updateContacts();
      }
    })
  }

}
