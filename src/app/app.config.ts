import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { INTERCEPTOR } from "./app.interceptors";
import { ROUTES } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideZoneChangeDetection(),
		provideRouter(ROUTES),
		INTERCEPTOR,
	],
};
