import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { CardComponent } from 'src/app/shared/shared-components/card/card.component';
import { PageTitleComponent } from 'src/app/shared/shared-components/page-title/page-title.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  standalone: true,
  imports: [
    CommonModule, CardComponent, PageTitleComponent, MatButtonModule
  ]
})
export class ContactsComponent {

  contacts = [];

  openDialog(){

  }

}
