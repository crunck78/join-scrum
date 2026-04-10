import {
	type HttpEvent,
	type HttpHandler,
	type HttpRequest,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { ScrumApiService } from "./scrum-api.service";
import { FORGOT_PASSWORD_ENDPOINT } from "./scrum-forgot-password/scrum-forgot-password.service";
import {
	GUEST_LOGIN_ENDPOINT,
	LOGIN_ENDPOINT,
} from "./scrum-login/scrum-login.service";
import { RESET_PASSWORD_ENDPOINT } from "./scrum-reset-password/scrum-reset-password.service";
import { SIGNUP_ENDPOINT } from "./scrum-signup/scrum-signup.service";

const PUBLIC_ENDPOINTS = [
	LOGIN_ENDPOINT,
	GUEST_LOGIN_ENDPOINT,
	SIGNUP_ENDPOINT,
	FORGOT_PASSWORD_ENDPOINT,
	RESET_PASSWORD_ENDPOINT,
];

@Injectable()
export class ScrumApiInterceptor {
	private scrumApiService = inject(ScrumApiService);

	intercept(
		httpRequest: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		if (!httpRequest.url.startsWith("http")) {
			httpRequest = httpRequest.clone({
				url: `${environment.apiEndpoint}${httpRequest.url}`,
			});
		}

		const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
			httpRequest.url.includes(endpoint),
		);

		if (!isPublic && this.scrumApiService.isLoggedIn()) {
			httpRequest = httpRequest.clone({
				setHeaders: {
					Authorization: `Token ${this.scrumApiService.token}`,
				},
			});
		}

		return next.handle(httpRequest);
	}
}
