import { type BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import type { MatDialog } from "@angular/material/dialog";
import { RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { AnnouncementComponent } from "src/app/shared/shared-components/dialogs/announcement/announcement.component";
import { LogoComponent } from "src/app/shared/shared-components/logo/logo.component";
import { PageComponent } from "src/app/shared/shared-components/page/page.component";
import { RouterLinkComponent } from "src/app/shared/shared-components/router-link/router-link.component";
import { ToSignUpComponent } from "src/app/shared/shared-components/to-sign-up/to-sign-up.component";

@Component({
	selector: "app-authentication",
	templateUrl: "./authentication.component.html",
	styleUrls: ["./authentication.component.scss"],
	imports: [
		RouterOutlet,
		LogoComponent,
		PageComponent,
		RouterLinkComponent,
		CommonModule,
		ToSignUpComponent,
		AnnouncementComponent,
	],
})
export class AuthenticationComponent {
	constructor(
		private breakpointObserver: BreakpointObserver,
		private dialog: MatDialog,
	) {
		this.dialog.open(AnnouncementComponent, { disableClose: true });
	}
	mobile$ = this.breakpointObserver
		.observe([Breakpoints.XSmall])
		.pipe(map((result) => result.matches));
}
