import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-initials',
  templateUrl: './contact-initials.component.html',
  styleUrls: ['./contact-initials.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ContactInitialsComponent {
  @Input() contactName!: string | undefined;
  @Input() backgroundColor = '#FF7A00';
  @Input() borderColor = '#FFFFFF';
  @Input() size = '21px'; // font-size
  @Input() imgSrc: string | null | undefined;

  get contactInitials() {
    // Check if contactName is not null or undefined and has a length greater than 0
    if (!this.contactName || this.contactName.length === 0) {
      return '';
    }

    const contactNames = this.contactName.split(' ').filter(cn => cn !== '');
    const initials = contactNames.map(name => name[0].toUpperCase());

    // If there's only one word in the contactName, return the first initial.
    // Otherwise, return the first initial and the last initial.
    return initials.length === 1 ? initials[0] : `${initials[0]}${initials[initials.length - 1]}`;
  }

}
