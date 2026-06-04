import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { clickElement } from "../../../testing/fixtures";
import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ForgotPasswordComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should call sendMail when button is clicked", async () => {
		const sendMailSpy = vi.spyOn(component, "sendMail");

		component.forgotPasswordForm.patchValue({ email: "test@example.com" });
		component.forgotPasswordForm.enable();
		clickElement(fixture, 'button[aria-label="Send reset password mail"]');
		expect(sendMailSpy).toHaveBeenCalled();
	});
});
