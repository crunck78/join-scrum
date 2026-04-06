import {
	type HttpEvent,
	type HttpHandler,
	type HttpRequest,
} from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { ScrumApiService } from "./scrum-api.service";

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

		if (this.scrumApiService.isLoggedIn()) {
			httpRequest = httpRequest.clone({
				setHeaders: {
					Authorization: `Token ${this.scrumApiService.apiToken$.getValue().token}`,
				},
			});
		}

		return next.handle(httpRequest);
	}
}
