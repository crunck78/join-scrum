import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { CardComponent } from '../card/card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatButtonModule,
  ]
})
export class ContactComponent {

    @Input() contact!: Contact;
    @Input() selected!: boolean;
}
