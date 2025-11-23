import {
	Component,
	Input,
	inject,
	type OnDestroy,
	type OnInit,
} from "@angular/core";

import {
	NavigationEnd,
	NavigationStart,
	type Route,
	Router,
} from "@angular/router";
import type { Subscription } from "rxjs";
import { RouterLinkComponent } from "../router-link/router-link.component";

@Component({
	selector: "app-to-sign-up",
	imports: [RouterLinkComponent],
	templateUrl: "./to-sign-up.component.html",
	styleUrls: ["./to-sign-up.component.scss"],
})
export class ToSignUpComponent implements OnInit, OnDestroy {
	private router = inject(Router);

	@Input() hideOnSameRoute = false;
	subscriptionRouterEvents!: Subscription;
	signUpRoute!: Route;
	isSignUpRoute = false;

	ngOnInit(): void {
		this.signUpRoute = this.router.config
			.find((r) => r.path === "auth")
			?.children?.find((r) => r.path === "sign-up") as Route;
		this.isSignUpRoute = this.router.url.includes(this.signUpRoute.path || "");

		this.subscriptionRouterEvents = this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.isSignUpRoute = event.url.includes(this.signUpRoute.path || "");
			}

			if (event instanceof NavigationEnd) {
				this.isSignUpRoute = event.urlAfterRedirects.includes(
					this.signUpRoute.path || "",
				);
			}
		});
	}
	ngOnDestroy(): void {
		this.subscriptionRouterEvents.unsubscribe();
	}
}
