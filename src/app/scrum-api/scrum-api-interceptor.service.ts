import {
	type HttpEvent,
	type HttpHandler,
	type HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { filter, type Observable, tap } from "rxjs";
import { environment } from "../../environments/environment.development";
import { ScrumApiService } from "./scrum-api.service";

export const SCRUM_API_ENDPOINT = environment.apiEndpoint;

@Injectable()
export class ScrumApiInterceptor {
	scrumApiService = inject(ScrumApiService);
	intercept(
		httpRequest: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		if (this.scrumApiService.isLoggedIn()) {
			httpRequest = httpRequest.clone({
				setHeaders: {
					Authorization: `Token ${this.scrumApiService.token}`,
				},
			});
		}
		return next.handle(httpRequest).pipe(
			filter((event: any) => {
				return event instanceof HttpResponse;
			}),
			tap((event: HttpResponse<any>) => {
				return event;
			}),
		);
	}
}
