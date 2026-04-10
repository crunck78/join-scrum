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
import {
	ResetPasswordCredentials,
	ScrumResetPasswordService,
} from "./scrum-reset-password.service";

const mockResetPasswordCredentials: ResetPasswordCredentials = {
	password: "newPassword123",
	token: "resetToken123",
};

describe("ScrumResetPasswordService", () => {
	let service: ScrumResetPasswordService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumResetPasswordService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("resetPassword", () => {
		it("should return true when request succeeded", async () => {
			const resultPromise = firstValueFrom(
				service.resetPassword$(mockResetPasswordCredentials),
			);

			const req = httpTesting.expectOne(
				service.resetPasswordEndpoint,
				"Request to reset password",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockResetPasswordCredentials);

			req.flush({});

			expect(await resultPromise).toBe(true);
		});

		it("should return false when request failed", async () => {
			const resultPromise = firstValueFrom(
				service.resetPassword$(mockResetPasswordCredentials),
			);

			const req = httpTesting.expectOne(
				service.resetPasswordEndpoint,
				"Request to reset password",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockResetPasswordCredentials);

			req.flush(
				{ message: "Error resetting password" },
				{ status: 400, statusText: "Bad Request" },
			);

			expect(await resultPromise).toBe(false);
		});
	});
});
