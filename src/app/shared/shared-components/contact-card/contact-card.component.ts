import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailLinkComponent } from '../email-link/email-link.component';
import { ContactResponse } from '../../models/contact.model';
import { ContactInitialsComponent } from '../contact-initials/contact-initials.component';

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
  @Input() contact!: ContactResponse | null;
  @Input() size: string = '21px';
  @Input() showName: boolean = true;
  contentProjected = false;
}
