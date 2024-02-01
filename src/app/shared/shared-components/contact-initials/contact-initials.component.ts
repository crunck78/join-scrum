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
  @Input() backgroundColor: string = '#FF7A00';
  @Input() borderColor: string = '#FFFFFF';
  @Input() size: string = '42px';
  @Input() imgSrc: string | null | undefined = 'assets/person.svg';

  get contactInitials() {
    const contactNames = this.contactName?.split(' ');
    const contactInitials = contactNames?.map(cn => cn[0].toUpperCase());
    return contactInitials?.join('');
  }

}
