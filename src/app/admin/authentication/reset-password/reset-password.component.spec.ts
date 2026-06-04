import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, provideRouter } from "@angular/router";
import { of } from "rxjs";
import { clickElement } from "../../../testing/fixtures";
import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
	let component: ResetPasswordComponent;
	let fixture: ComponentFixture<ResetPasswordComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ResetPasswordComponent],
			providers: [
				provideRouter([]),
				{
					provide: ActivatedRoute,
					useValue: { queryParams: of({ token: "test token" }) },
				},
			],
		});
		fixture = TestBed.createComponent(ResetPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should call resetPassword on button click", async () => {
		const resetPasswordPsy = vi.spyOn(component, "resetPassword");
		const serviceResetPasswordSpy = vi.spyOn(
			component["resetPasswordService"],
			"resetPassword",
		);
		// Enable the form to allow interaction
		component.resetPasswordForm.enable();

		clickElement(fixture, "button[aria-label='Reset password']");
		expect(resetPasswordPsy).toHaveBeenCalledTimes(0);
		expect(serviceResetPasswordSpy).toHaveBeenCalledTimes(0);

		component.resetPasswordForm.setValue({
			password: "<PASSWORD>",
			confirmedPassword: "<PASSWORD>",
		});
		await fixture.whenStable();
		clickElement(fixture, "button[aria-label='Reset password']");
		expect(resetPasswordPsy).toHaveBeenCalledTimes(1);
		expect(serviceResetPasswordSpy).toHaveBeenCalledTimes(1);
	});
});
