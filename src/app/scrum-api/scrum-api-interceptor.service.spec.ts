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
import { BehaviorSubject } from "rxjs";
import { ScrumApiInterceptor } from "./scrum-api-interceptor.service";
import { type ApiToken, ScrumApiService } from "./scrum-api.service";

describe("ScrumApiInterceptor", () => {
	let httpTesting: HttpTestingController;
	let httpClient: HttpClient;
	const isLoggedIn = vi.fn();
	const apiToken$ = new BehaviorSubject<ApiToken>({ token: "" });

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
				{
					provide: HTTP_INTERCEPTORS,
					useClass: ScrumApiInterceptor,
					multi: true,
				},
				{
					provide: ScrumApiService,
					useValue: { isLoggedIn, apiToken$ },
				},
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
		it("should add Authorization header when logged in", () => {
			isLoggedIn.mockReturnValue(true);
			apiToken$.next({ token: "test-token" });
			httpClient.get("/test").subscribe();

			const req = httpTesting.expectOne("/test");
			expect(req.request.headers.has("Authorization")).toBe(true);
			expect(req.request.headers.get("Authorization")).toBe("Token test-token");
			req.flush({});
		});

		it("should not add Authorization header when not logged in", () => {
			isLoggedIn.mockReturnValue(false);
			httpClient.get("/test").subscribe();

			const req = httpTesting.expectOne("/test");
			expect(req.request.headers.has("Authorization")).toBe(false);
			req.flush({});
		});
	});
});
