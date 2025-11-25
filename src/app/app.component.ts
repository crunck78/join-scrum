import { Component, inject, type OnDestroy, type OnInit } from "@angular/core";
import type { MatDrawerMode } from "@angular/material/sidenav";
import { map, type Subscription } from "rxjs";
import { AppModule } from "./app.module";
import { type ApiToken, ScrumApiService } from "./scrum-api/scrum-api.service";
import { BreakpointsService } from "./shared/shared-services/breakpoints/breakpoints.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	imports: [AppModule],
})
export class AppComponent implements OnInit, OnDestroy {
	private scrumApi = inject(ScrumApiService);
	private breakpoints = inject(BreakpointsService);

	title = "join";
	web$ = this.breakpoints.matchesWebBreakpoint$.pipe(
		map((matches) => (matches ? "side" : ("over" as MatDrawerMode))),
	);
	onNextTokenSub$!: Subscription;

	isLoggedIn$ = this.scrumApi.apiToken$.pipe(
		map((apiToken: ApiToken) => !!apiToken.token),
	);

	ngOnInit(): void {
		this.onNextTokenSub$ = this.scrumApi.apiToken$.subscribe((apiToken) =>
			this.scrumApi.onNextToken(apiToken),
		);
	}

	ngOnDestroy(): void {
		this.onNextTokenSub$.unsubscribe();
	}
}
