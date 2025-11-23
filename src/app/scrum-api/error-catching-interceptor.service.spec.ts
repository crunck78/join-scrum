import { importProvidersFrom } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ROUTES } from "src/app/app.routes";
import { MaterialModule } from "../shared/modules/material/material.module";
import { ErrorCatchingInterceptor } from "./error-catching-interceptor.service";

describe("ErrorCatchingInterceptorService", () => {
	let service: ErrorCatchingInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ErrorCatchingInterceptor,
				provideRouter(ROUTES),
				importProvidersFrom(MaterialModule),
			],
		});
		service = TestBed.inject(ErrorCatchingInterceptor);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
