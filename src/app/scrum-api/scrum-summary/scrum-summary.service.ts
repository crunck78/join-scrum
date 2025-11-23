import type { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, type Observable, of } from "rxjs";
import {
	Summary,
	type SummaryResponse,
	type SummaryResponseAPI,
} from "src/app/shared/models/summary.model";
import type { ScrumApiService } from "../scrum-api.service";
import { SCRUM_API_ENDPOINT } from "../scrum-api-interceptor.service";

export const SUMMARY_ENDPOINT = SCRUM_API_ENDPOINT + "/api/summary/";

@Injectable({
	providedIn: "root",
})
export class ScrumSummaryService {
	summaryEndpoint = SUMMARY_ENDPOINT;

	constructor(
		private http: HttpClient,
		private scrumApi: ScrumApiService,
	) {}

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
