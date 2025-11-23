import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, tap } from "rxjs";
import { type ApiToken, ScrumApiService } from "../scrum-api.service";
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
	private http = inject(HttpClient);
	private scrumApi = inject(ScrumApiService);

	loginCredentials!: LoginCredentials;
	loginEndpoint = LOGIN_ENDPOINT;
	guestLoginEndpoint = GUEST_LOGIN_ENDPOINT;

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
