import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { AnnouncementComponent } from "../../shared/shared-components/dialogs/announcement/announcement.component";
import { LogoComponent } from "../../shared/shared-components/logo/logo.component";
import { ToSignUpComponent } from "../../shared/shared-components/to-sign-up/to-sign-up.component";

@Component({
	selector: "app-authentication",
	templateUrl: "./authentication.component.html",
	styleUrls: ["./authentication.component.scss"],
	imports: [RouterOutlet, LogoComponent, CommonModule, ToSignUpComponent],
})
export class AuthenticationComponent {
	private breakpointObserver = inject(BreakpointObserver);
	private dialog = inject(MatDialog);

	constructor() {
		this.dialog.open(AnnouncementComponent, { disableClose: true });
	}
	mobile$ = this.breakpointObserver
		.observe([Breakpoints.XSmall])
		.pipe(map((result) => result.matches));
}
