import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const SIGNUP_ENDPOINT = "/api/user/create/";

export interface SignupCredentials {
	name?: string;
	email: string;
	password: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumSignupService {
	private http = inject(HttpClient);

	signupEndPoint = SIGNUP_ENDPOINT;

	signup$(credentials: SignupCredentials) {
		return this.http.post(this.signupEndPoint, credentials).pipe(
			map(() => true as const),
			catchError(() => of(false as const)),
		);
	}
}
