import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    RouterLinkActive
  ]
})
export class RouterLinkComponent {

  @Input() route!: Route;

}
