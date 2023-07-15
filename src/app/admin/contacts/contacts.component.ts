import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
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
import { DialogService } from 'src/app/shared/shared-services/dialog/dialog.service';
import { Contact, ContactResponse } from 'src/app/shared/models/contact.model';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints.service';
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
    MatToolbarModule,
    MatIconModule,
  ]
})
export class ContactsComponent implements AfterViewInit {

  @ViewChild('contacts-list') contactsList!: ElementRef<HTMLElement>;

  contacts$!: Observable<ContactResponse[] | undefined>;
  selectedContact!: ContactResponse | null;

  constructor(private scrumContacts: ScrumContactsService,
    private dialog: MatDialog,
    private breakPoints: BreakpointsService){
      this.updateContacts();
  }

  get matchWebBreakpoint$ (){
    return this.breakPoints.matchesWebBreakpoint$;
  }

  ngAfterViewInit(): void {

  }

  addContact(){
    const dialogRef = this.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(newContact => {
      if(newContact){
        this.updateContacts();
      }
    })
  }

  alreadyExists(letter: string){
    return document.getElementById(`contacts-${letter}`);
  }

  updateContacts(){
    this.contacts$ = this.scrumContacts.getContacts$();
  }

  closeSelectedContact(){
    this.selectedContact = null;
  }

}
