import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Summary,
	SummaryResponse,
	SummaryResponseAPI,
} from "../../shared/models/summary.model";
export const SUMMARY_ENDPOINT = "/api/summary/";

@Injectable({
	providedIn: "root",
})
export class ScrumSummaryService {
	private http = inject(HttpClient);

	summaryEndpoint = SUMMARY_ENDPOINT;

	getSummary$(): Observable<SummaryResponse | null> {
		return this.http.get<SummaryResponseAPI>(this.summaryEndpoint).pipe(
			map((summary) => Summary.createInternalValue(summary)),
			catchError(() => of(null)),
		);
	}
}
