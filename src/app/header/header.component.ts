import { Component, EventEmitter, inject, Output } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { HeaderModule } from "./header.module";
import { HeaderService } from "./header.service";

export type OpenCloseStatus = "closed" | "open";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	imports: [HeaderModule],
})
export class HeaderComponent {
	private headerService = inject(HeaderService);
	@Output() toggleDrawer = new EventEmitter();
	headerState$ = new BehaviorSubject<OpenCloseStatus>("closed");

	arrowTransform$ = this.headerState$.pipe(
		map((state) =>
			state === "closed"
				? "translate(45, 50) rotate(180, 6.99996, 8)"
				: "translate(45, 45)",
		),
	);

	toggleHeader(event: Event) {
		event.preventDefault();
		const current = this.headerState$.getValue();
		this.headerState$.next(current === "open" ? "closed" : "open");
	}

	logout() {
		this.headerService.logout();
	}

	get matchWebBreakpoint$() {
		return this.headerService.breakPoints.matchesWebBreakpoint$;
	}
}
