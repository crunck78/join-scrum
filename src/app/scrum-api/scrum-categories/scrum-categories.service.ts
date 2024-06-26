import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { CategoryResponse, CategoryResponseAPI, Category, CategoryRequest } from 'src/app/shared/models/category.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const CATEGORIES_ENDPOINT = SCRUM_API_ENDPOINT + '/api/category/categories/';

@Injectable({
  providedIn: 'root'
})
export class ScrumCategoriesService {

  categoriesEndpoint = CATEGORIES_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getCategories$(): Observable<CategoryResponse[]> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<CategoryResponseAPI[]>(this.categoriesEndpoint, options)
      .pipe(
        map((categories: CategoryResponseAPI[]) => categories.map(c => Category.createInternalValue(c))),
        catchError(() => of([]))
      );
  }

  addCategory$(editCategory: Partial<CategoryRequest>): Observable<CategoryResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    const newCategory = Category.createRepresentation(editCategory);
    return this.http.post<CategoryResponseAPI>(this.categoriesEndpoint, newCategory, options)
      .pipe(
        map((category: CategoryResponseAPI | null) => category ? Category.createInternalValue(category) : null),
        catchError(() => of(null))
      );
  }
}
