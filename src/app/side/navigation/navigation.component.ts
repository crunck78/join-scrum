import { Component, inject } from "@angular/core";
import { Router, type Routes } from "@angular/router";
import { ScrumApiService } from "../../scrum-api/scrum-api.service";
import { RouterLinkComponent } from "../../shared/shared-components/router-link/router-link.component";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"],
	imports: [RouterLinkComponent],
})
export class NavigationComponent {
	private router = inject(Router);
	private scrumApi = inject(ScrumApiService);

	get isLoggedIn(): boolean {
		return this.scrumApi.isLoggedIn();
	}

	get routes(): Routes {
		return this.router.config;
	}
}
