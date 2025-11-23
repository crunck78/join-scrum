import type { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of, tap } from "rxjs";
import type { FeedbackService } from "src/app/shared/shared-services/feedback/feedback.service";
import type { ApiToken, ScrumApiService } from "../scrum-api.service";
import {
	GUEST_LOGIN_ENDPOINT,
	LOGIN_ENDPOINT,
} from "./login-interceptor.service";

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface LoginResponse {
	token: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumLoginService {
	loginCredentials!: LoginCredentials;
	loginEndpoint = LOGIN_ENDPOINT;
	guestLoginEndpoint = GUEST_LOGIN_ENDPOINT;

	constructor(
		private http: HttpClient,
		private scrumApi: ScrumApiService,
		private feedback: FeedbackService,
	) {}

	guestLogin() {
		return this.http.post<ApiToken>(this.guestLoginEndpoint, {}).pipe(
			tap((response) => this.scrumApi.apiToken$.next(response)),
			map(() => true),
			catchError(() => of(false)),
		);
	}

	login(credentials: LoginCredentials) {
		return this.http.post<ApiToken>(this.loginEndpoint, credentials).pipe(
			tap((response) => this.scrumApi.apiToken$.next(response)),
			map(() => true),
			catchError(() => of(false)),
		);
	}
}
