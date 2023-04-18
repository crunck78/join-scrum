import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { CardComponent } from '../card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';
import { ContactCardComponent } from '../contact-card/contact-card/contact-card.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatButtonModule,
    ContactCardComponent,
  ]
})
export class ContactComponent {

    @Input() contact!: Contact;
    @Input() selected!: boolean;
}
