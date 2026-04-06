import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
export const RESET_PASSWORD_ENDPOINT = "/api/user/password_reset/confirm/";

export interface ResetPasswordCredentials {
	password: string;
	token: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumResetPasswordService {
	private http = inject(HttpClient);

	resetPasswordEndpoint = RESET_PASSWORD_ENDPOINT;
	token!: string;

	resetPassword(credentials: ResetPasswordCredentials) {
		return this.http.post(this.resetPasswordEndpoint, credentials).pipe(
			map(() => true),
			catchError(() => of(false)),
		);
	}
}
