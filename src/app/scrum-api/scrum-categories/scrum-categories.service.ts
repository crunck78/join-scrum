import { Injectable } from '@angular/core';
import { CATEGORIES_ENDPOINT } from './categories-interceptor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScrumApiService } from '../scrum-api.service';
import { catchError, of } from 'rxjs';

export interface Category{
  id?: string,
  name: string,
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class ScrumCategoriesService {

  categoriesEndpoint = CATEGORIES_ENDPOINT;
  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getCategories$() {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<Category[]>(this.categoriesEndpoint, { headers })
      .pipe(catchError(error => of<Category[]>([])));
  }

  addCategory$(newCategory: Category) {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.post<Category>(this.categoriesEndpoint, newCategory, { headers })
    .pipe(catchError(error => of(undefined)));
  }
}
