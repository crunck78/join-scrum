import { Component } from "@angular/core";
import { MaterialModule } from "../shared/modules/material/material.module";
import { LogoComponent } from "../shared/shared-components/logo/logo.component";
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
	selector: "app-side",
	templateUrl: "./side.component.html",
	styleUrls: ["./side.component.scss"],
	imports: [MaterialModule, LogoComponent, NavigationComponent],
})
export class SideComponent {}
