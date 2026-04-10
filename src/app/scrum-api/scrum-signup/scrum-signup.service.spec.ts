import {
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import { ScrumSignupService, SignupCredentials } from "./scrum-signup.service";

const mockSignupCredentials: SignupCredentials = {
	email: "test@example.com",
	password: "password123",
};

describe("ScrumSignupService", () => {
	let service: ScrumSignupService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumSignupService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("signup", () => {
		it("should return true on successful signup", async () => {
			const resultPromise = firstValueFrom(
				service.signup$(mockSignupCredentials),
			);

			const req = httpTesting.expectOne(
				service.signupEndPoint,
				"Request to signup endpoint",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockSignupCredentials);

			req.flush({});
			expect(await resultPromise).toBe(true);
		});

		it("should return false when request fails", async () => {
			const resultPromise = firstValueFrom(
				service.signup$(mockSignupCredentials),
			);

			const req = httpTesting.expectOne(
				service.signupEndPoint,
				"Request to signup endpoint",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockSignupCredentials);

			req.flush({}, { status: 500, statusText: "Server Error" });
			expect(await resultPromise).toBe(false);
		});
	});
});
