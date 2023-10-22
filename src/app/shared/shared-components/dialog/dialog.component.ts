import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from '../logo/logo.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    LogoComponent,
    CommonModule,
    MatDialogModule
  ]
})
export class DialogComponent {

  @Input() title!: string;

}
