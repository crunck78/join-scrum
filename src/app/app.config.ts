import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { INTERCEPTOR } from "./app.interceptors";
import { ROUTES } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withInterceptorsFromDi()),
		provideZoneChangeDetection(),
		provideRouter(ROUTES),
		INTERCEPTOR,
	],
};
