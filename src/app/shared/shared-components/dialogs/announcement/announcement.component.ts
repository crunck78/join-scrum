import { Component } from "@angular/core";
import { MaterialModule } from "../../../modules/material/material.module";
import { DialogComponent } from "../../dialog/dialog.component";

@Component({
	selector: "app-announcement",
	templateUrl: "./announcement.component.html",
	styleUrls: ["./announcement.component.scss"],
	imports: [DialogComponent, MaterialModule],
})
export class AnnouncementComponent {}
