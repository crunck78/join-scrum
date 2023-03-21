import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogoComponent } from 'src/app/shared/shared-components/logo/logo.component';
import { PageComponent } from '../page/page.component';
import { RouterLinkComponent } from '../router-link/router-link.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    PageComponent,
    RouterLinkComponent,
    CommonModule
  ]
})
export class AuthenticationComponent {
  signUpRoute!: Route;
  constructor(private router: Router) {
    console.log(this.router.config.flat())
    this.signUpRoute = this.router.config.find(r => r.path == 'auth')?.children?.find(r => r.path == 'sign-up') as Route;
    console.log(this.signUpRoute);
  }
}
