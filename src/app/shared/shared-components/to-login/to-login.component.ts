import { Component } from "@angular/core";
import type { Route, Router } from "@angular/router";
import { MaterialModule } from "../../modules/material/material.module";
import { RouterLinkComponent } from "../router-link/router-link.component";

@Component({
	selector: "app-to-login",
	imports: [MaterialModule, RouterLinkComponent],
	templateUrl: "./to-login.component.html",
	styleUrls: ["./to-login.component.scss"],
})
export class ToLoginComponent {
	logInRoute: Route;
	constructor(private router: Router) {
		this.logInRoute = this.router.config
			.find((r) => r.path === "auth")
			?.children?.find((r) => r.path === "log-in") as Route;
	}
}
