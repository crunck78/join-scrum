import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { clickElement } from "../../../testing/fixtures";
import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RegisterComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		});
		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should call signUp on button click", () => {
		const signUpSpy = vi.spyOn(component, "signUp");
		const serviceSignUpSpy = vi.spyOn(component["registerService"], "signUp");

		// Enable the form to allow interaction
		component.signupForm.enable();
		clickElement(fixture, "button[aria-label='Sign up']");

		expect(signUpSpy).toHaveBeenCalledOnce();
		expect(serviceSignUpSpy).toHaveBeenCalledTimes(0);

		component.signupForm.setValue({
			name: "Test",
			email: "test@email.com",
			password: "<PASSWORD>",
		});
		clickElement(fixture, "button[aria-label='Sign up']");
		expect(serviceSignUpSpy).toHaveBeenCalledTimes(1);
	});
});
