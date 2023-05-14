import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    CardComponent,
    PageTitleComponent,
  ]
})
export class BoardComponent {

}
