import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { ScrumApiService } from "../scrum-api.service";

export const publicGuard: CanActivateFn = () => {
	const router = inject(Router);
	const scrumApi = inject(ScrumApiService);

	if (scrumApi.isLoggedIn()) {
		router.navigate(["/summary"]);
		return false;
	}

	return true;
};
