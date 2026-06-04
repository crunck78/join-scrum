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
	FORGOT_PASSWORD_ENDPOINT,
	ForgotPasswordCredentials,
	ScrumForgotPasswordService,
} from "./scrum-forgot-password.service";

const mockedForgotPasswordPayload: ForgotPasswordCredentials = {
	email: "test@email.local",
};

describe("ScrumForgotPasswordService", () => {
	let service: ScrumForgotPasswordService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumForgotPasswordService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("sendEmail", () => {
		it("should return true when request succeeded", async () => {
			const resultPromise = firstValueFrom(
				service.sendMail$(mockedForgotPasswordPayload),
			);
			const req = httpTesting.expectOne(
				`${FORGOT_PASSWORD_ENDPOINT}?email=${mockedForgotPasswordPayload.email}`,
				"Request to forgot password",
			);
			expect(req.request.method).toBe("POST");

			req.flush(true);

			expect(await resultPromise).toEqual(true);
		});
		it("should return fails when request fails", async () => {
			const resultPromise = firstValueFrom(
				service.sendMail$(mockedForgotPasswordPayload),
			);
			const req = httpTesting.expectOne(
				`${FORGOT_PASSWORD_ENDPOINT}?email=${mockedForgotPasswordPayload.email}`,
				"Request to forgot password",
			);
			expect(req.request.method).toBe("POST");

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual(false);
		});
	});
});
