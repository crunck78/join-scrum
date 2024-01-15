import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Route, Router, RouterLink } from '@angular/router';
import { RouterLinkComponent } from '../router-link/router-link.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkComponent],
  templateUrl: './to-sign-up.component.html',
  styleUrls: ['./to-sign-up.component.scss']
})
export class ToSignUpComponent implements OnInit, OnDestroy {
  @Input() hideOnSameRoute = false;
  subscriptionRouterEvents !: Subscription;
  signUpRoute!: Route;
  isSignUpRoute = false;  // New property to track if current route is signUpRoute
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.signUpRoute = this.router.config.find(r => r.path == 'auth')?.children?.find(r => r.path == 'sign-up') as Route;
    this.isSignUpRoute = this.router.url.includes(this.signUpRoute.path || '');

    this.subscriptionRouterEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSignUpRoute = event.url.includes(this.signUpRoute.path || '');
      }

      if (event instanceof NavigationEnd) {
        this.isSignUpRoute = event.urlAfterRedirects.includes(this.signUpRoute.path || '');
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptionRouterEvents.unsubscribe();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['hideOnSameRoute']) {

  //     this.hideOnSameRoute = changes['hideOnSameRoute'].currentValue;
  //     if (changes['hideOnSameRoute'].isFirstChange()) {
  //       // Listen to route changes

  //     }
  //   }
  // }
}
