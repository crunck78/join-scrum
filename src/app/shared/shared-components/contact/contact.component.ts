import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContactResponse } from '../../models/contact.model';
import { CardComponent } from '../card/card.component';
import { ContactCardComponent } from '../contact-card/contact-card.component';

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
