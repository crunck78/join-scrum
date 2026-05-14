import { Component, inject, OnInit } from "@angular/core";
import { SummaryResponse } from "../../shared/models/summary.model";
import { UserResponse } from "../../shared/models/user.model";
import { SummaryModule } from "./summary.module";
import { SummaryService } from "./summary.service";

@Component({
	selector: "app-summary",
	templateUrl: "./summary.component.html",
	styleUrls: ["./summary.component.scss"],
	imports: [SummaryModule],
})
export class SummaryComponent implements OnInit {
	private summaryService = inject(SummaryService);

	summary!: SummaryResponse | null;
	profile!: UserResponse | null;

	ngOnInit() {
		this.summaryService.summary$.subscribe(
			(summary) => (this.summary = summary),
		);

		this.summaryService.profile$.subscribe(
			(profile) => (this.profile = profile),
		);
	}

	get greetUser(): string {
		const hours = new Date().getHours();
		if (hours < 12) {
			return "Good morning";
		} else if (hours < 18) {
			return "Good afternoon";
		} else {
			return "Good evening";
		}
	}

	get summaryEmpty() {
		if (!this.summary) return true;
		return (
			this.summary.tasksByCategory.length === 0 &&
			this.summary.tasksByPriority.length === 0 &&
			this.summary.tasksInLists.length === 0 &&
			this.summary.tasksInBacklog.count === 0
		);
	}
}
