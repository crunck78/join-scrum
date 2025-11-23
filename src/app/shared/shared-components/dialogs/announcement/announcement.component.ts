import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { DialogComponent } from "../../dialog/dialog.component";

@Component({
	selector: "app-announcement",
	templateUrl: "./announcement.component.html",
	styleUrls: ["./announcement.component.scss"],
	imports: [DialogComponent, MaterialModule, RouterLink],
})
export class AnnouncementComponent {}
