import { HTTP_INTERCEPTORS } from "@angular/common/http";
import type { Provider } from "@angular/core";
import { ErrorCatchingInterceptor } from "./scrum-api/error-catching-interceptor.service";
import { ScrumApiInterceptor } from "./scrum-api/scrum-api-interceptor.service";

export const INTERCEPTOR: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ScrumApiInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorCatchingInterceptor,
		multi: true,
	},
];
