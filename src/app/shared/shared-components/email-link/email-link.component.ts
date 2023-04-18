import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-link',
  templateUrl: './email-link.component.html',
  styleUrls: ['./email-link.component.scss'],
  standalone: true,
})
export class EmailLinkComponent {
  @Input() email!: string | undefined;
}
