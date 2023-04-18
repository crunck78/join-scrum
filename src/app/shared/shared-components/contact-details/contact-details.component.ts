import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';
import { ContactCardComponent } from '../contact-card/contact-card/contact-card.component';
import { MatButtonModule } from '@angular/material/button';
import { EmailLinkComponent } from '../email-link/email-link.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContactCardComponent,
    MatButtonModule,
    EmailLinkComponent,
  ]
})
export class ContactDetailsComponent {
  @Input() contact!: Contact | null;
}
