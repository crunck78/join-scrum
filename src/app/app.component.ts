import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    SideComponent,
    MainComponent
  ],
})
export class AppComponent {
  title = 'join';
}
