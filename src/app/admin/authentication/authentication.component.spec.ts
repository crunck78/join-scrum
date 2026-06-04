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

	describe("toggle header", () => {
		const scenarios = [
			{
				description: "not show header",
				isMobile: true,
				expected: 0,
			},
			{
				description: "show header",
				isMobile: false,
				expected: 1,
			},
		];

		it.each(scenarios)("should $description", async ({
			isMobile,
			expected,
		}) => {
			mobileGetSpy.mockReturnValue(of(isMobile));
			await fixture.whenStable();
			const el: HTMLElement = fixture.nativeElement;
			expect(el.querySelectorAll(".header").length).toBe(expected);
			expect(el.querySelectorAll("app-to-sign-up").length).toBe(1);
		});
	});
});
