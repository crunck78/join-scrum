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
import { ApiToken } from "../scrum-api.service";
import {
	LOGIN_ENDPOINT,
	LoginCredentials,
	ScrumLoginService,
} from "./scrum-login.service";

const mockApiTokenResponse: ApiToken = {
	token: "mocked-token",
};

const mockLoginCredentials: LoginCredentials = {
	email: "user@example.com",
	password: "password",
};

describe("ScrumLoginService", () => {
	let service: ScrumLoginService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumLoginService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("login", () => {
		it("should return true when request succeeded", async () => {
			const resultPromise = firstValueFrom(service.login(mockLoginCredentials));

			const req = httpTesting.expectOne(LOGIN_ENDPOINT, "Request to login");
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockLoginCredentials);

			req.flush(mockApiTokenResponse);

			expect(await resultPromise).toBe(true);
		});

		it("should return false when request fails", async () => {
			const resultPromise = firstValueFrom(service.login(mockLoginCredentials));

			const req = httpTesting.expectOne(LOGIN_ENDPOINT, "Request to login");
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(mockLoginCredentials);

			req.flush(null, { status: 500, statusText: "Internal Server Error" });

			expect(await resultPromise).toBe(false);
		});
	});

	describe("guestLogin", () => {
		it("should return true when request succeeded", async () => {
			const resultPromise = firstValueFrom(service.guestLogin());

			const req = httpTesting.expectOne(
				service.guestLoginEndpoint,
				"Request to guest login",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual({});

			req.flush(mockApiTokenResponse);

			expect(await resultPromise).toBe(true);
		});

		it("should return false when request fails", async () => {
			const resultPromise = firstValueFrom(service.guestLogin());

			const req = httpTesting.expectOne(
				service.guestLoginEndpoint,
				"Request to guest login",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual({});

			req.flush(null, { status: 500, statusText: "Internal Server Error" });

			expect(await resultPromise).toBe(false);
		});
	});
});
