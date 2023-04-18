import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { ContactInitialsComponent } from '../../contact-initials/contact-initials/contact-initials.component';
import { CommonModule } from '@angular/common';
import { EmailLinkComponent } from '../../email-link/email-link.component';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  standalone: true,
  imports: [
    ContactInitialsComponent,
    CommonModule,
    EmailLinkComponent
  ]
})
export class ContactCardComponent {
  @Input() contact!: Contact | null;
  contentProjected = false;

  onContentLoad(event: any){
    console.log(event);
  }
}
