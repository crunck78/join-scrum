import { Component } from '@angular/core';
import { LogoComponent } from '../shared/shared-components/logo/logo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    LogoComponent,
    NavigationComponent
  ]
})
export class SideComponent {

}
