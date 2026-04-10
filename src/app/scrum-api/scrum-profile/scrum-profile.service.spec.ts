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
	User,
	UserRequest,
	UserResponseAPI,
} from "../../shared/models/user.model";
import { ScrumProfileService } from "./scrum-profile.service";

const mockProfile: UserResponseAPI = {
	id: 1,
	email: "test@example.com",
	name: "Test User",
	image: "test-image.jpg",
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
	is_guest: false,
};

const mockUserRequest: UserRequest = {
	email: "test@example.com",
	name: "Test User",
	image: "test-image.jpg",
};

describe("ScrumProfileService", () => {
	let service: ScrumProfileService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumProfileService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getProfile$", () => {
		it("should return user profile on success", () => {
			const resultPromise = firstValueFrom(service.getProfile$());
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to get user profile",
			);
			expect(req.request.method).toBe("GET");

			req.flush(mockProfile);

			expect(resultPromise).resolves.toEqual(
				User.createInternalValue(mockProfile),
			);
		});

		it("should return null on error", () => {
			const resultPromise = firstValueFrom(service.getProfile$());
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to get user profile",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(resultPromise).resolves.toEqual(null);
		});
	});

	describe("editProfile$", () => {
		it("should return updated user profile on success", () => {
			const resultPromise = firstValueFrom(
				service.editProfile$(mockUserRequest),
			);
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to edit user profile",
			);
			expect(req.request.method).toBe("PATCH");
			expect(req.request.body).toEqual(
				User.createRepresentation(mockUserRequest),
			);

			req.flush(mockProfile);

			expect(resultPromise).resolves.toEqual(
				User.createInternalValue(mockProfile),
			);
		});

		it("should return null on error", () => {
			const resultPromise = firstValueFrom(
				service.editProfile$(mockUserRequest),
			);
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to edit user profile",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(resultPromise).resolves.toEqual(null);
		});
	});

	describe("deleteProfile$", () => {
		it("should return true on successful deletion", () => {
			const resultPromise = firstValueFrom(service.deleteProfile$());
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to delete user profile",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush(true);

			expect(resultPromise).resolves.toBe(true);
		});

		it("should return false on error", () => {
			const resultPromise = firstValueFrom(service.deleteProfile$());
			const req = httpTesting.expectOne(
				service.profileEndpoint,
				"Request to delete user profile",
			);
			expect(req.request.method).toBe("DELETE");

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(resultPromise).resolves.toBe(false);
		});
	});
});
