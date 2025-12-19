import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LogoComponent } from "../../shared/shared-components/logo/logo.component";
import { ToSignUpComponent } from "../../shared/shared-components/to-sign-up/to-sign-up.component";
import { AuthenticationService } from "./authentication.service";

@Component({
	selector: "app-authentication",
	templateUrl: "./authentication.component.html",
	styleUrls: ["./authentication.component.scss"],
	imports: [RouterOutlet, LogoComponent, CommonModule, ToSignUpComponent],
})
export class AuthenticationComponent {
	private authService = inject(AuthenticationService);

	constructor() {
		this.authService.openAnnouncementDialog();
	}
	get mobile$() {
		return this.authService.mobile$;
	}
}
