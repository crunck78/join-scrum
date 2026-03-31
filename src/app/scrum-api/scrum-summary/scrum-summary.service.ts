import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Summary,
	SummaryResponse,
	SummaryResponseAPI,
} from "../../shared/models/summary.model";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const SUMMARY_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/summary/`;

@Injectable({
	providedIn: "root",
})
export class ScrumSummaryService {
	private http = inject(HttpClient);

	summaryEndpoint = SUMMARY_ENDPOINT;

	getSummary$(): Observable<SummaryResponse | null> {
		return this.http.get<SummaryResponseAPI>(this.summaryEndpoint).pipe(
			map((summary) => (summary ? Summary.createInternalValue(summary) : null)),
			catchError(() => of(null)),
		);
	}
}
