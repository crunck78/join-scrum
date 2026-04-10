import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { ScrumApiService } from "../scrum-api.service";

export const noAuthGuard: CanActivateFn = () => {
	const router = inject(Router);
	const scrumApi = inject(ScrumApiService);

	if (scrumApi.isLoggedIn()) {
		return router.createUrlTree(["/summary"]);
	}

	return true;
};
