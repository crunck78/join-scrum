import {
	HttpEvent,
	HttpHandler,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

export const SCRUM_API_ENDPOINT = environment.apiEndpoint;

@Injectable()
export class ScrumApiInterceptor {
	intercept(
		httpRequest: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
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
