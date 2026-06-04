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
import { Category } from "../../shared/models/category.model";
import {
	createCategoryRequestAPI,
	createCategoryResponseAPI,
} from "../../testing/fixtures";
import {
	CATEGORIES_ENDPOINT,
	ScrumCategoriesService,
} from "./scrum-categories.service";

const mockCategory = createCategoryResponseAPI();
const mockCategoryRequest = createCategoryRequestAPI();

describe("ScrumCategoriesService", () => {
	let service: ScrumCategoriesService;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ScrumCategoriesService);
	});

	afterEach(() => {
		httpTesting.verify();
		vi.clearAllMocks();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getCategories$", () => {
		it("should return mapped categories on success", async () => {
			const resultPromise = firstValueFrom(service.getCategories$());
			const req = httpTesting.expectOne(
				CATEGORIES_ENDPOINT,
				"Request to load categories",
			);
			expect(req.request.method).toBe("GET");

			req.flush([mockCategory]);

			expect(await resultPromise).toEqual([
				Category.createInternalValue(mockCategory),
			]);
		});

		it("should return empty array on error", async () => {
			const resultPromise = firstValueFrom(service.getCategories$());
			const req = httpTesting.expectOne(
				CATEGORIES_ENDPOINT,
				"Request to load categories",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toEqual([]);
		});
	});

	describe("addCategory$", () => {
		it("should return mapped category on success", async () => {
			const resultPromise = firstValueFrom(
				service.addCategory$(mockCategoryRequest),
			);
			const req = httpTesting.expectOne(
				CATEGORIES_ENDPOINT,
				"Request to add category",
			);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(
				Category.createRepresentation(mockCategoryRequest),
			);

			req.flush(mockCategory);

			expect(await resultPromise).toEqual(
				Category.createInternalValue(mockCategory),
			);
		});

		it("should return null on error", async () => {
			const resultPromise = firstValueFrom(
				service.addCategory$(mockCategoryRequest),
			);
			const req = httpTesting.expectOne(
				CATEGORIES_ENDPOINT,
				"Request to add category",
			);

			req.flush("Server error", {
				status: 500,
				statusText: "Internal Server Error",
			});

			expect(await resultPromise).toBeNull();
		});
	});
});
