import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ScrumApiService } from '../scrum-api.service';
import { Summary, SummaryResponse, SummaryResponseAPI } from 'src/app/shared/models/summary.model';
import { SCRUM_API_ENDPOINT } from '../scrum-api-interceptor.service';

export const SUMMARY_ENDPOINT = SCRUM_API_ENDPOINT + '/api/summary/';

@Injectable({
  providedIn: 'root'
})
export class ScrumSummaryService {

  summaryEndpoint = SUMMARY_ENDPOINT;

  constructor(private http: HttpClient, private scrumApi: ScrumApiService) { }

  getSummary$(): Observable<SummaryResponse | null> {
    const options = { headers: this.scrumApi.headersTokenAuthorization };
    return this.http.get<SummaryResponseAPI>(this.summaryEndpoint, options)
      .pipe(
        catchError(() => of(null)),
        map(summary => summary ? Summary.createInternalValue(summary) : null)
      );
  }
}
