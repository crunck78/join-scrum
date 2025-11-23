import { Component, EventEmitter, Input, inject, Output } from "@angular/core";
import type { ViewState } from "../app.component";
import { HeaderModule } from "./header.module";
import { HeaderService } from "./header.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	imports: [HeaderModule],
})
export class HeaderComponent {
	private headerService = inject(HeaderService);

	@Input() toggleHeaderView!: ViewState;
	@Output() toggleDrawer = new EventEmitter();

	logout() {
		this.headerService.logout();
	}

	get matchWebBreakpoint$() {
		return this.headerService.breakPoints.matchesWebBreakpoint$;
	}
}
