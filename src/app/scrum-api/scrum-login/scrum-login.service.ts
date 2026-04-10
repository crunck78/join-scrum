import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, pipe, tap } from "rxjs";
import { type ApiToken, ScrumApiService } from "../scrum-api.service";

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface LoginResponse {
	token: string;
}

export const LOGIN_ENDPOINT = "/api/user/token/";
export const GUEST_LOGIN_ENDPOINT = "/api/user/create-guest/";

@Injectable({
	providedIn: "root",
})
export class ScrumLoginService {
	private http = inject(HttpClient);
	private scrumApi = inject(ScrumApiService);

	loginCredentials!: LoginCredentials;
	loginEndpoint = LOGIN_ENDPOINT;
	guestLoginEndpoint = GUEST_LOGIN_ENDPOINT;

	login(credentials: LoginCredentials) {
		return this.http
			.post<ApiToken>(this.loginEndpoint, credentials)
			.pipe(this._handleLoginResponse());
	}

	guestLogin() {
		return this.http
			.post<ApiToken>(this.guestLoginEndpoint, {})
			.pipe(this._handleLoginResponse());
	}

	private _handleLoginResponse() {
		return pipe(
			tap((response: ApiToken) => {
				this.scrumApi.token = response.token;
			}),
			map(() => true as const),
			catchError(() => of(false as const)),
		);
	}
}
