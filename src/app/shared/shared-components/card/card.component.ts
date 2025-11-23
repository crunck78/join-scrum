import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [
        MaterialModule
    ]
})
export class CardComponent {

}
