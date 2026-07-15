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

type ResponseBody =
	| string
	| number
	| boolean
	| object
	| ArrayBuffer
	| Blob
	| (string | number | boolean | object | null)[]
	| null;

describe("ErrorCatchingInterceptor", () => {
	let httpTesting: HttpTestingController;
	let httpClient: HttpClient;
	const openSnackBar = vi.fn();
	const logout = vi.fn();
	const errorSpy = vi.fn();

	const respondWithError = (
		status: number,
		body: ResponseBody = {},
		statusText = "Error",
	) => {
		httpTesting.expectOne("/test").flush(body, {
			status,
			statusText,
		});

		vi.runAllTimers();
	};

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

		vi.useFakeTimers();
		httpClient.get("/test").subscribe({ error: errorSpy });
	});

	afterEach(() => {
		vi.useRealTimers();
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should propagate the error to the caller", () => {
		respondWithError(500, {}, "Server Error");
		expect(errorSpy).toHaveBeenCalled();
	});

	describe("401", () => {
		it("should call logout and not show snackbar", () => {
			respondWithError(401, {}, "Unauthorized");
			expect(logout).toHaveBeenCalled();
			expect(openSnackBar).not.toHaveBeenCalled();
		});
	});

	describe("status 0 (network error)", () => {
		it("should show 'Something went wrong!' snackbar", () => {
			httpTesting.expectOne("/test").error(new ProgressEvent("error"));
			vi.runAllTimers();
			expect(openSnackBar).toHaveBeenCalledWith("Something went wrong!");
		});
	});

	describe("5xx server error", () => {
		it("should show error.detail in snackbar", () => {
			respondWithError(
				500,
				{ detail: "Internal Server Error" },
				"Internal Server Error",
			);
			expect(openSnackBar).toHaveBeenCalledWith("Internal Server Error");
		});

		it("should show 'Something went wrong!' when no detail", () => {
			respondWithError(500, {}, "Internal Server Error");
			expect(openSnackBar).toHaveBeenCalledWith("Something went wrong!");
		});
	});

	describe("4xx bad request", () => {
		it("should show a snackbar per array field error", () => {
			respondWithError(
				400,
				{ email: ["This field is required.", "Enter a valid email."] },
				"Bad Request",
			);
			expect(openSnackBar).toHaveBeenCalledWith(
				"EMAIL: This field is required.",
			);
			expect(openSnackBar).toHaveBeenCalledWith("EMAIL: Enter a valid email.");
		});

		it("should show a snackbar for string field errors", () => {
			respondWithError(
				400,
				{ password: "This field is required." },
				"Bad Request",
			);
			expect(openSnackBar).toHaveBeenCalledWith(
				"PASSWORD: This field is required.",
			);
		});

		it("should show a snackbar for nested object field errors", () => {
			respondWithError(
				400,
				{ address: { city: ["This field is required."] } },
				"Bad Request",
			);
			expect(openSnackBar).toHaveBeenCalledWith(
				"ADDRESS - CITY: This field is required.",
			);
		});

		it("should show a snackbar for nested string field errors", () => {
			respondWithError(
				400,
				{ address: { city: "This field is required." } },
				"Bad Request",
			);
			expect(openSnackBar).toHaveBeenCalledWith(
				"ADDRESS - CITY: This field is required.",
			);
		});
	});
});
