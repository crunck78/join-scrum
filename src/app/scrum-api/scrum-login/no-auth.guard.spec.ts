import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { ScrumApiService } from "../scrum-api.service";
import { loginGuard } from "./log-in.guard";
import { noAuthGuard } from "./no-auth.guard";

@Component({ template: "<h1>Protected Page</h1>" })
class Protected {}
@Component({ template: "<h1>Login Page</h1>" })
class Login {}

describe("NoAuthGuard", () => {
	const isLoggedIn = vi.fn();
	let harness: RouterTestingHarness;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ScrumApiService,
					useValue: { isLoggedIn },
				},
				provideRouter([
					{
						path: "summary",
						component: Protected,
						canActivate: [loginGuard],
					},
					{ path: "auth/log-in", component: Login, canActivate: [noAuthGuard] },
				]),
			],
		});
		harness = await RouterTestingHarness.create();
	});

	it("allows navigation when user is not authenticated", async () => {
		isLoggedIn.mockReturnValue(false);
		await harness.navigateByUrl("/auth/log-in", Login);
		// The login component should render when not authenticated
		expect(harness.routeNativeElement?.textContent).toContain("Login Page");
	});

	it("redirects to summary when user is authenticated", async () => {
		isLoggedIn.mockReturnValue(true);
		await harness.navigateByUrl("/auth/log-in");
		// The protected component should render when authenticated
		expect(harness.routeNativeElement?.textContent).toContain("Protected Page");
		expect(harness.routeDebugElement?.injector.get(Router).url).toBe(
			"/summary",
		);
	});
});
