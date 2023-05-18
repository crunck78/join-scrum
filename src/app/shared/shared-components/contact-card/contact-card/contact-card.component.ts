import { Component, Input } from '@angular/core';
import { ContactInitialsComponent } from '../../contact-initials/contact-initials/contact-initials.component';
import { CommonModule } from '@angular/common';
import { EmailLinkComponent } from '../../email-link/email-link.component';
import { ContactResponse } from 'src/app/shared/models/contact.model';

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
  contentProjected = false;

  onContentLoad(event: any){
    console.log(event);
  }
}
