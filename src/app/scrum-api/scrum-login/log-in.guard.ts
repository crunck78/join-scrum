import { inject } from "@angular/core";
import {
	type ActivatedRouteSnapshot,
	type CanActivateFn,
	Router,
	type RouterStateSnapshot,
} from "@angular/router";
import { ScrumApiService } from "../scrum-api.service";

export const canActivate: CanActivateFn = (
	_route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	const router = inject(Router);
	const scrumApi = inject(ScrumApiService);

	if (scrumApi.isLoggedIn()) {
		return true;
	}

	router.navigate(["/auth/log-in"], { queryParams: { returnUrl: state.url } });
	return false;
};
