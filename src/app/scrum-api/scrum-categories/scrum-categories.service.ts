import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Category,
	CategoryRequest,
	CategoryResponse,
	CategoryResponseAPI,
} from "../../shared/models/category.model";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const CATEGORIES_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/category/categories/`;

@Injectable({
	providedIn: "root",
})
export class ScrumCategoriesService {
	private http = inject(HttpClient);

	categoriesEndpoint = CATEGORIES_ENDPOINT;

	getCategories$(): Observable<CategoryResponse[]> {
		return this.http.get<CategoryResponseAPI[]>(this.categoriesEndpoint).pipe(
			map((categories: CategoryResponseAPI[]) =>
				categories.map((c) => Category.createInternalValue(c)),
			),
			catchError(() => of([])),
		);
	}

	addCategory$(
		editCategory: Partial<CategoryRequest>,
	): Observable<CategoryResponse | null> {
		const newCategory = Category.createRepresentation(editCategory);
		return this.http
			.post<CategoryResponseAPI>(this.categoriesEndpoint, newCategory)
			.pipe(
				map((category: CategoryResponseAPI | null) =>
					category ? Category.createInternalValue(category) : null,
				),
				catchError(() => of(null)),
			);
	}
}
