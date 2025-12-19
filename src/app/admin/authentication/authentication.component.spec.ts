import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { AuthenticationComponent } from "./authentication.component";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationComponent", () => {
	let component: AuthenticationComponent;
	let fixture: ComponentFixture<AuthenticationComponent>;
	let authService: AuthenticationService;
	let mobileGetSpy: Mock<() => Observable<boolean>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AuthenticationComponent],
			providers: [AuthenticationService],
		});

		authService = TestBed.inject(AuthenticationService);
		mobileGetSpy = vi.spyOn(authService, "mobile$", "get");
		fixture = TestBed.createComponent(AuthenticationComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should show header on not mobile", async () => {
		mobileGetSpy.mockReturnValue(of(false));
		const el: HTMLElement = fixture.nativeElement;
		await fixture.whenStable();
		expect(el.querySelector(".header")).not.toBeNull();
		expect(el.querySelectorAll("app-to-sign-up").length).toBe(1);
	});

	it("should not show header on mobile", async () => {
		mobileGetSpy.mockReturnValue(of(true));
		const el: HTMLElement = fixture.nativeElement;
		await fixture.whenStable();
		expect(el.querySelector(".header")).toBeNull();
		expect(el.querySelectorAll("app-to-sign-up").length).toBe(1);
	});
});
