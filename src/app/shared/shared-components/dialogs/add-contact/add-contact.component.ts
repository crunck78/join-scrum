import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  standalone: true,
  imports: [
    DialogComponent
  ]
})
export class AddContactComponent {

}
