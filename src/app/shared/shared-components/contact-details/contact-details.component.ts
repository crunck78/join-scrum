import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ContactDetailsComponent {
  @Input() contact$!: Observable<Contact | null>;
}
