import { Injectable, inject } from "@angular/core";
import { ScrumResetPasswordService } from "../../../scrum-api/scrum-reset-password/scrum-reset-password.service";

@Injectable({
	providedIn: "root",
})
export class ResetPasswordService {
	scrumResetPassword = inject(ScrumResetPasswordService);
}
