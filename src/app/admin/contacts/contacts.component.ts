import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Contact, ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [
    CommonModule, CardComponent, PageTitleComponent, MatButtonModule
  ]
})
export class ContactsComponent {

  contacts$!: Observable<Contact[]>;

  constructor(private scrumContacts: ScrumContactsService){
    this.contacts$ = this.scrumContacts.getContacts$();
  }

  openDialog(){

  }

}
