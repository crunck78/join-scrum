import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-to-login',
  templateUrl: './to-login.component.html',
  styleUrls: ['./to-login.component.scss'],
  standalone: true,
  imports: [
    MaterialModule
  ]
})
export class ToLoginComponent {

}
