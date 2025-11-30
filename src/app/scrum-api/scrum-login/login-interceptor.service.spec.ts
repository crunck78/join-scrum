import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { LoginInterceptor } from "./login-interceptor.service";

describe("LoginInterceptorService", () => {
	let service: LoginInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoginInterceptor],
		});
		service = TestBed.inject(LoginInterceptor);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
