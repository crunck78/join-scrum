import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    MaterialModule,
    RouterLink
  ]
})
export class AnnouncementComponent {

}
