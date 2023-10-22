import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { LogoComponent } from '../shared/shared-components/logo/logo.component';
import { MaterialModule } from '../shared/modules/material/material.module';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    LogoComponent,
    NavigationComponent
  ]
})
export class SideComponent {

}
