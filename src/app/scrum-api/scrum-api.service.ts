import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export interface ApiToken {
	token: string;
}

@Injectable({
	providedIn: "root",
})
export class ScrumApiService {
	private router = inject(Router);

	apiToken$: BehaviorSubject<ApiToken>;

	constructor() {
		const init = this.rememberMe ? this.localToken : "";
		this.apiToken$ = new BehaviorSubject<ApiToken>({ token: init });
	}

	get token(): string {
		return this.apiToken$.getValue().token;
	}

	isLoggedIn(): boolean {
		const token = this.apiToken$.getValue();
		return !!token && token.token !== "";
	}

	set rememberMe(value: boolean) {
		try {
			localStorage.setItem("rememberMe", JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	}

	get rememberMe() {
		try {
			return JSON.parse(localStorage.getItem("rememberMe") || "false") || false;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	set localToken(token: string) {
		try {
			localStorage.setItem("join-token", token);
		} catch (error) {
			console.log(error);
		}
	}

	get localToken() {
		try {
			return localStorage.getItem("join-token") as string;
		} catch (error) {
			console.log(error);
			return "";
		}
	}

	logout() {
		if (this.rememberMe) this.localToken = "";
		this.router.navigate(["/auth/log-in"]);
		this.apiToken$.next({ token: "" });
	}
}
