import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map, of, type Observable } from "rxjs";
import {
	Summary,
	type SummaryResponse,
	type SummaryResponseAPI,
} from "src/app/shared/models/summary.model";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";
import { ScrumApiService } from "../scrum-api.service";

export const SUMMARY_ENDPOINT = `${SCRUM_API_ENDPOINT}/api/summary/`;

@Injectable({
	providedIn: "root",
})
export class ScrumSummaryService {
	private http = inject(HttpClient);
	private scrumApi = inject(ScrumApiService);

	summaryEndpoint = SUMMARY_ENDPOINT;

	getSummary$(): Observable<SummaryResponse | null> {
		const options = { headers: this.scrumApi.headersTokenAuthorization };
		return this.http
			.get<SummaryResponseAPI>(this.summaryEndpoint, options)
			.pipe(
				map((summary) =>
					summary ? Summary.createInternalValue(summary) : null,
				),
				catchError(() => of(null)),
			);
	}
}
