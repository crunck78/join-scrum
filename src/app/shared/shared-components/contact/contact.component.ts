import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';
import { ContactCardComponent } from '../contact-card/contact-card/contact-card.component';
import { ContactResponse } from '../../models/contact.model';

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

    @Input() contact!: ContactResponse;
    @Input() selected!: boolean;
}
