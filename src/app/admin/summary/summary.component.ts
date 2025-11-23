import { Component, inject } from "@angular/core";
import type { SummaryResponse } from "src/app/shared/models/summary.model";
import type { UserResponse } from "src/app/shared/models/user.model";
import { SummaryModule } from "./summary.module";
import { SummaryService } from "./summary.service";

@Component({
	selector: "app-summary",
	templateUrl: "./summary.component.html",
	styleUrls: ["./summary.component.scss"],
	imports: [SummaryModule],
	providers: [SummaryService],
})
export class SummaryComponent {
	private summaryService = inject(SummaryService);

	get summaryEmpty(): boolean {
		return this.summaryService.summaryEmpty;
	}

	get summary(): SummaryResponse | null {
		return this.summaryService.summary;
	}

	get profile(): UserResponse | null {
		return this.summaryService.profile;
	}

	get matchWebBreakpoint$() {
		return this.summaryService.breakPoints.matchesWebBreakpoint$;
	}

	get greetUser(): string {
		const hours = new Date().getHours();
		let greeting = "Hello";
		if (hours < 12) {
			greeting = "Good morning";
		} else if (hours < 18) {
			greeting = "Good afternoon";
		} else {
			greeting = "Good evening";
		}
		return greeting;
	}
}
