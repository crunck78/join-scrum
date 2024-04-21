import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss'],
  standalone: true,
  imports: [CardComponent]
})
export class LegalNoticeComponent {

}
