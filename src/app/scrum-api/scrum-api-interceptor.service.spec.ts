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
import { ScrumApiInterceptor } from "./scrum-api-interceptor.service";
import { ScrumApiService } from "./scrum-api.service";

describe("ScrumApiInterceptor", () => {
	let httpTesting: HttpTestingController;
	let httpClient: HttpClient;
	const isLoggedIn = vi.fn();

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
					useValue: {
						isLoggedIn,
						token: "test-token",
					},
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
			httpClient.get("/test").subscribe();

			const req = httpTesting.expectOne("http://localhost:8000/test");
			expect(req.request.headers.has("Authorization")).toBe(true);
			expect(req.request.headers.get("Authorization")).toBe("Token test-token");
			req.flush({});
		});

		it("should not add Authorization header when not logged in", () => {
			isLoggedIn.mockReturnValue(false);
			httpClient.get("/test").subscribe();

			const req = httpTesting.expectOne("http://localhost:8000/test");
			expect(req.request.headers.has("Authorization")).toBe(false);
			req.flush({});
		});

		it("should not modify URL when it is already absolute", () => {
			isLoggedIn.mockReturnValue(false);
			httpClient.get("http://other-host.com/api/resource").subscribe();

			const req = httpTesting.expectOne("http://other-host.com/api/resource");
			expect(req.request.url).toBe("http://other-host.com/api/resource");
			req.flush({});
		});
	});
});
