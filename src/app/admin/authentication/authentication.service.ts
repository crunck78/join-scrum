import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AnnouncementComponent } from "../../shared/shared-components/dialogs/announcement/announcement.component";
import { BreakpointsService } from "../../shared/shared-services/breakpoints/breakpoints.service";

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	private breakPoints = inject(BreakpointsService);
	private dialog = inject(MatDialog);

	openAnnouncementDialog() {
		this.dialog.open(AnnouncementComponent, { disableClose: true });
	}

	get mobile$() {
		return this.breakPoints.mobile$;
	}
}
