import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { provideRouter } from "@angular/router";
import { LogInComponent } from "./log-in.component";

describe("LogInComponent", () => {
	let component: LogInComponent;
	let fixture: ComponentFixture<LogInComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LogInComponent],
			providers: [provideRouter([])],
		});
		fixture = TestBed.createComponent(LogInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should call login method on button click", () => {
		const loginSpy = vi.spyOn(component, "login");
		const loginServiceSpy = vi.spyOn(component["loginService"], "login");
		// Enable the form to allow interaction
		component.loginForm.enable();

		const button: HTMLElement = fixture.nativeElement.querySelector(
			"button[aria-label='Login']",
		);

		button.click();
		expect(loginSpy).toHaveBeenCalled();
		expect(loginServiceSpy).toHaveBeenCalledTimes(0);

		component.loginForm.setValue({
			email: "test@email.com",
			password: "<PASSWORD>",
		});
		button.click();
		expect(loginServiceSpy).toHaveBeenCalledTimes(1);
	});

	it("should call guest login method on button click", () => {
		const guestLoginSpy = vi.spyOn(component, "guestLogin");
		const button: HTMLElement = fixture.nativeElement.querySelector(
			"button[aria-label='Guest Login']",
		);
		button.click();
		expect(guestLoginSpy).toHaveBeenCalled();
	});

	it("should update rememberMe in service on checkbox change", async () => {
		const loginRememberMeSpy = vi.spyOn(
			component["loginService"],
			"rememberMe",
			"set",
		);

		component.rememberMe.setValue(false);
		fixture.detectChanges();

		const loader = TestbedHarnessEnvironment.loader(fixture);
		const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
		await checkboxHarness.check();
		fixture.detectChanges();
		expect(loginRememberMeSpy).toHaveBeenCalledWith(true);

		await checkboxHarness.uncheck();
		fixture.detectChanges();
		expect(loginRememberMeSpy).toHaveBeenCalledWith(false);
	});
});
