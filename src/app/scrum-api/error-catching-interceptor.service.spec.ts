import {
	HTTP_INTERCEPTORS,
	HttpClient,
	provideHttpClient,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { FeedbackService } from "../shared/shared-services/feedback/feedback.service";
import { ErrorCatchingInterceptor } from "./error-catching-interceptor.service";
import { ScrumApiService } from "./scrum-api.service";

describe("ErrorCatchingInterceptor", () => {
	let httpTesting: HttpTestingController;
	let httpClient: HttpClient;
	const openSnackBar = vi.fn();
	const logout = vi.fn();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
				{
					provide: HTTP_INTERCEPTORS,
					useClass: ErrorCatchingInterceptor,
					multi: true,
				},
				{ provide: FeedbackService, useValue: { openSnackBar } },
				{ provide: ScrumApiService, useValue: { logout } },
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	describe("intercept", () => {
		it("should propagate the error to the caller", () => {
			const errorSpy = vi.fn();
			httpClient.get("/test").subscribe({ error: errorSpy });
			httpTesting.expectOne("/test").flush({}, { status: 500, statusText: "Server Error" });
			expect(errorSpy).toHaveBeenCalled();
		});

		describe("401", () => {
			it("should call logout", () => {
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush({}, { status: 401, statusText: "Unauthorized" });
				expect(logout).toHaveBeenCalled();
			});

			it("should not show a snackbar", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush({}, { status: 401, statusText: "Unauthorized" });
				vi.runAllTimers();
				expect(openSnackBar).not.toHaveBeenCalled();
				vi.useRealTimers();
			});
		});

		describe("status 0 (network error)", () => {
			it("should show 'Something went wrong!' snackbar", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").error(new ProgressEvent("error"));
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("Something went wrong!");
				vi.useRealTimers();
			});
		});

		describe("5xx server error", () => {
			it("should show error.detail in snackbar", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush(
					{ detail: "Internal Server Error" },
					{ status: 500, statusText: "Internal Server Error" },
				);
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("Internal Server Error");
				vi.useRealTimers();
			});

			it("should show 'Something went wrong!' when no detail", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush({}, { status: 500, statusText: "Internal Server Error" });
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("Something went wrong!");
				vi.useRealTimers();
			});
		});

		describe("4xx bad request", () => {
			it("should show a snackbar per array field error", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush(
					{ email: ["This field is required.", "Enter a valid email."] },
					{ status: 400, statusText: "Bad Request" },
				);
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("EMAIL: This field is required.");
				expect(openSnackBar).toHaveBeenCalledWith("EMAIL: Enter a valid email.");
				vi.useRealTimers();
			});

			it("should show a snackbar for string field errors", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush(
					{ password: "This field is required." },
					{ status: 400, statusText: "Bad Request" },
				);
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("PASSWORD: This field is required.");
				vi.useRealTimers();
			});

			it("should show a snackbar for nested object field errors", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush(
					{ address: { city: ["This field is required."] } },
					{ status: 400, statusText: "Bad Request" },
				);
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("ADDRESS - CITY: This field is required.");
				vi.useRealTimers();
			});

			it("should show a snackbar for nested string field errors", () => {
				vi.useFakeTimers();
				httpClient.get("/test").subscribe({ error: () => {} });
				httpTesting.expectOne("/test").flush(
					{ address: { city: "This field is required." } },
					{ status: 400, statusText: "Bad Request" },
				);
				vi.runAllTimers();
				expect(openSnackBar).toHaveBeenCalledWith("ADDRESS - CITY: This field is required.");
				vi.useRealTimers();
			});
		});
	});
});
