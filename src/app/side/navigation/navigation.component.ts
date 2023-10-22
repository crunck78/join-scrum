import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RouterLinkComponent } from 'src/app/shared/shared-components/router-link/router-link.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkComponent
  ]
})
export class NavigationComponent {

  constructor(private router: Router) {}

  get routes() : Routes {
    return this.router.config;
  }
}
