import { Injectable, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { ScrumApiService } from "../../../scrum-api/scrum-api.service";
import {
	LoginCredentials,
	ScrumLoginService,
} from "../../../scrum-api/scrum-login/scrum-login.service";
import { BreakpointsService } from "../../../shared/shared-services/breakpoints/breakpoints.service";
@Injectable({
	providedIn: "root",
})
export class LogInService {
	private scrumLogin = inject(ScrumLoginService);
	private router = inject(Router);
	private route = inject(ActivatedRoute);
	private scrumApi = inject(ScrumApiService);
	private breakPoints = inject(BreakpointsService);

	returnUrl = "";

	constructor() {
		this.route.queryParams
			.pipe(take(1))
			.subscribe((params) => (this.returnUrl = params["returnUrl"] || ""));
	}

	get rememberMe() {
		return this.scrumApi.rememberMe;
	}

	set rememberMe(value: boolean) {
		this.scrumApi.rememberMe = value;
	}

	get mobile$() {
		return this.breakPoints.mobile$;
	}

	login(loginCredentials: LoginCredentials) {
		this.scrumLogin
			.login(loginCredentials)
			.pipe(take(1))
			.subscribe((isLogged) => {
				this.navigateToReturnUrlIfLoggedIn(isLogged);
			});
	}

	guestLogin() {
		this.scrumLogin
			.guestLogin()
			.pipe(take(1))
			.subscribe((isLogged) => {
				this.navigateToReturnUrlIfLoggedIn(isLogged);
			});
	}

	private navigateToReturnUrlIfLoggedIn(isLogged: boolean) {
		if (!isLogged) return;
		this.router.navigate([this.returnUrl]);
	}
}
