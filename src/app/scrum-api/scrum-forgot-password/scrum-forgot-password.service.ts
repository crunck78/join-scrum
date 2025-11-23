import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const FORGOT_PASSWORD_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/user/password_reset/`;

export interface ForgotPasswordCredentials {
	email: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumForgotPasswordService {
	forgotPasswordEndpoint = FORGOT_PASSWORD_ENDPOINT;

	constructor(private http: HttpClient) {}

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
