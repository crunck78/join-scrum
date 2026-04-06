import {
	type HttpEvent,
	type HttpHandler,
	type HttpInterceptor,
	type HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { filter, type Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { ScrumApiService } from "../scrum-api.service";

export const LOGIN_ENDPOINT = "/api/user/token/";
export const GUEST_LOGIN_ENDPOINT = "/api/user/create-guest/";

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
	private scrumApi = inject(ScrumApiService);

	intercept(
		httpRequest: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		return next.handle(httpRequest).pipe(
			filter((event: any) => event instanceof HttpResponse),
			tap((event: HttpResponse<any>) => {
				if (
					this.scrumApi.rememberMe &&
					(httpRequest.url === `${environment.apiEndpoint}${LOGIN_ENDPOINT}` ||
						httpRequest.url ===
							`${environment.apiEndpoint}${GUEST_LOGIN_ENDPOINT}`)
				)
					this.scrumApi.localToken = event.body.token;
				return event;
			}),
		);
	}
}
