import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';

export const SUMMARY_ENDPOINT = 'api/summary/';

@Injectable({
  providedIn: 'root'
})
export class ScrumSummaryService {

  summaryEndpoint = SUMMARY_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getSummary$(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Token ${this.scrumApi.token}`
    });

    return this.http.get<any>(this.summaryEndpoint, { headers })
      .pipe(
        catchError(() => of(null)),
        map(summary => summary)
      );
  }
}
