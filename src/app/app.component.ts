import { Component, inject } from "@angular/core";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	imports: [AppModule],
})
export class AppComponent {
	private appService = inject(AppService);

	get web$() {
		return this.appService.web$;
	}

	get isLoggedIn$() {
		return this.appService.isLoggedIn$;
	}
}
