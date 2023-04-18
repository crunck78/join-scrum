import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Contact, ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddContactComponent } from 'src/app/shared/shared-components/dialogs/add-contact/add-contact.component';
import { ComponentType } from '@angular/cdk/portal';
import { EditContactComponent } from 'src/app/shared/shared-components/dialogs/edit-contact/edit-contact.component';
import { ContactComponent } from 'src/app/shared/shared-components/contact/contact.component';
import { AtoZPipe } from './atoz.pipe';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ContactDetailsComponent } from 'src/app/shared/shared-components/contact-details/contact-details.component';
import {MatToolbarModule} from '@angular/material/toolbar';
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
    MatDialogModule,
    ContactComponent,
    AtoZPipe,
    MatDividerModule,
    MatListModule,
    ContactDetailsComponent,
    MatToolbarModule
  ]
})
export class ContactsComponent implements AfterViewInit {

  @ViewChild('contacts-list') contactsList!: ElementRef<HTMLElement>;

  contacts$!: Observable<Contact[]>;
  selectedContact$ = new BehaviorSubject<Contact | null>(null);

  constructor(private scrumContacts: ScrumContactsService,
    public dialog: MatDialog){
    this.contacts$ = this.scrumContacts.getContacts$();
  }

  ngAfterViewInit(): void {

  }

  addContact(){
    const dialogRef = this.openDialog(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if(newContact){
        this.contacts$ = this.scrumContacts.getContacts$();
      }
    })
  }

  editContact(contactToEdit: Contact){
    const dialogRef = this.openDialog(EditContactComponent);
    dialogRef.componentInstance.contact = contactToEdit;
  }

  openDialog(component : ComponentType<any>){
    return this.dialog.open(component);
  }

  alreadyExists(letter: string){
    return document.getElementById(`contacts-${letter}`);
  }

}
