import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
export const FORGOT_PASSWORD_ENDPOINT = "/api/user/password_reset/";

export interface ForgotPasswordCredentials {
	email: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumForgotPasswordService {
	private http = inject(HttpClient);

	forgotPasswordEndpoint = FORGOT_PASSWORD_ENDPOINT;

	sendMail(credentials: ForgotPasswordCredentials) {
		return this.http
			.post(
				`${this.forgotPasswordEndpoint}?email=${credentials.email}`,
				credentials,
			)
			.pipe(
				map(() => true),
				catchError(() => of(false)),
			);
	}
}
