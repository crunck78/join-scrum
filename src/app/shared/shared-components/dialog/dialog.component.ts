import { Component, Input } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from '../logo/logo.component';
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [
    LogoComponent,
    MatDialogModule
]
})
export class DialogComponent {

  @Input() title!: string;

}
