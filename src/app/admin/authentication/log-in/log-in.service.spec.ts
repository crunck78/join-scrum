import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";
import { LogInService } from "./log-in.service";

describe("LogInService", () => {
	let service: LogInService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LogInService, provideRouter([])],
		});
		service = TestBed.inject(LogInService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should not called navigation to returnUrl ", () => {
		const routerNavigationSpy = vi.spyOn(service["router"], "navigateByUrl");
		const scrumLoginServiceLoginSpy = vi.spyOn(service["scrumLogin"], "login");
		const scrumLoginServiceGuestLoginSpy = vi.spyOn(
			service["scrumLogin"],
			"guestLogin",
		);

		scrumLoginServiceLoginSpy.mockReturnValue(of(false));
		scrumLoginServiceGuestLoginSpy.mockReturnValue(of(false));
		service.login({ email: "", password: "" });
		service.guestLogin();
		expect(routerNavigationSpy).toHaveBeenCalledTimes(0);

		scrumLoginServiceLoginSpy.mockReturnValue(of(true));
		scrumLoginServiceGuestLoginSpy.mockReturnValue(of(true));
		service.login({ email: "", password: "" });
		service.guestLogin();
		expect(routerNavigationSpy).toHaveBeenCalledTimes(2);
	});
});
