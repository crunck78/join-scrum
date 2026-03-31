import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";
import { HeaderComponent } from "./header.component";
import { HeaderService } from "./header.service";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let headerService: HeaderService;
	let matchWebBreakpointSpy$: Mock<() => Observable<boolean>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HeaderComponent],
			providers: [
				HeaderService,
				{ provide: ScrumApiService, useValue: { logout: vi.fn() } },
				{ provide: BreakpointsService, useValue: { matchesWebBreakpoint$: of(true) } },
			],
		});
		headerService = TestBed.inject(HeaderService);
		matchWebBreakpointSpy$ = vi.spyOn(headerService, "matchWebBreakpoint$", "get");
		matchWebBreakpointSpy$.mockReturnValue(of(true));

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create", () => {
		fixture.autoDetectChanges();

		expect(component).toBeDefined();
	});

	describe("toggleHeader", () => {
		it("should toggle headerState from closed to open", () => {
			fixture.autoDetectChanges();

			expect(component.headerState$.value).toBe("closed");

			component.toggleHeader(new Event("click"));

			expect(component.headerState$.value).toBe("open");
		});

		it("should toggle headerState back to closed", () => {
			fixture.autoDetectChanges();

			component.toggleHeader(new Event("click"));
			component.toggleHeader(new Event("click"));

			expect(component.headerState$.value).toBe("closed");
		});
	});

	describe("logout", () => {
		it("should call HeaderService.logout when web logout button is clicked", () => {
			const logoutSpy = vi.spyOn(headerService, "logout");
			logoutSpy.mockImplementation(() => {});
			fixture.autoDetectChanges();

			const logoutButton: HTMLButtonElement =
				fixture.nativeElement.querySelector('button[color="primary"]');
			logoutButton.click();

			expect(logoutSpy).toHaveBeenCalledOnce();
		});

		it("should call HeaderService.logout when mobile logout button is clicked", () => {
			matchWebBreakpointSpy$.mockReturnValue(of(false));
			const logoutSpy = vi.spyOn(headerService, "logout");
			logoutSpy.mockImplementation(() => {});
			fixture.autoDetectChanges();

			const logoutButton: HTMLButtonElement =
				fixture.nativeElement.querySelector('button[color="primary"]');
			logoutButton.click();

			expect(logoutSpy).toHaveBeenCalledOnce();
		});
	});

	describe("toggleDrawer", () => {
		it("should emit toggleDrawer when menu button is clicked", () => {
			fixture.autoDetectChanges();

			const toggleDrawerSpy = vi.spyOn(component.toggleDrawer, "emit");
			const menuButton: HTMLButtonElement = (
				fixture.nativeElement.querySelector(
					"button mat-icon",
				) as HTMLElement
			).parentElement as HTMLButtonElement;
			menuButton.click();

			expect(toggleDrawerSpy).toHaveBeenCalledOnce();
		});
	});
});
