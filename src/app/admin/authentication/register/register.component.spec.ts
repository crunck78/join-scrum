import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
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
		const button: HTMLElement = fixture.nativeElement.querySelector(
			"button[aria-label='Sign up']",
		);
		// Enable the form to allow interaction
		component.signupForm.enable();

		button.click();
		expect(signUpSpy).toHaveBeenCalledOnce();
		expect(serviceSignUpSpy).toBeCalledTimes(0);

		component.signupForm.setValue({
			name: "Test",
			email: "test@email.com",
			password: "<PASSWORD>",
		});
		button.click();
		expect(serviceSignUpSpy).toHaveBeenCalledTimes(1);
	});
});
