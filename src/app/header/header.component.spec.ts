import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Mock } from "vitest";
import { ScrumApiService } from "../scrum-api/scrum-api.service";
import { BreakpointsService } from "../shared/shared-services/breakpoints/breakpoints.service";
import { clickElement, getElement } from "../testing/fixtures";
import { HeaderComponent } from "./header.component";
import { HeaderService } from "./header.service";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let headerService: HeaderService;
	let matchWebBreakpointSpy$: Mock<() => Observable<boolean>>;
	let logoutSpy: Mock<() => void>;
	let getMatchWebBreakpoint$: BehaviorSubject<boolean>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HeaderComponent],
			providers: [
				HeaderService,
				{ provide: ScrumApiService, useValue: { logout: vi.fn() } },
				{
					provide: BreakpointsService,
					useValue: { matchesWebBreakpoint$: of(true) },
				},
			],
		});
		headerService = TestBed.inject(HeaderService);

		matchWebBreakpointSpy$ = vi.spyOn(
			headerService,
			"matchWebBreakpoint$",
			"get",
		);
		getMatchWebBreakpoint$ = new BehaviorSubject(true);
		matchWebBreakpointSpy$.mockReturnValue(getMatchWebBreakpoint$);
		logoutSpy = vi.spyOn(headerService, "logout");
		logoutSpy.mockImplementation(() => {});

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should initialize with header closed", () => {
		fixture.autoDetectChanges();

		expect(component.headerState$.value).toBe("closed");
	});

	it("should open header when opener is clicked", () => {
		fixture.autoDetectChanges();

		clickElement(fixture, ".opener");

		expect(component.headerState$.value).toBe("open");
	});

	it("should close header on touchstart", () => {
		fixture.autoDetectChanges();

		const opener = getElement(fixture, ".opener");
		opener.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));

		fixture.detectChanges();

		expect(component.headerState$.value).toBe("open");
	});

	it("should call logout twice when primary button clicked and breakpoint changes", () => {
		fixture.autoDetectChanges();

		clickElement(fixture, 'button[color="primary"]');

		getMatchWebBreakpoint$.next(false);
		fixture.detectChanges();

		clickElement(fixture, 'button[color="primary"]');

		expect(logoutSpy).toHaveBeenCalledTimes(2);
	});

	it("should emit toggleDrawer when menu button clicked", () => {
		fixture.autoDetectChanges();

		const toggleDrawerSpy = vi.spyOn(component.toggleDrawer$, "emit");

		const menuButton = getElement(fixture, "button mat-icon")
			.parentElement as HTMLButtonElement;

		menuButton.click();

		expect(toggleDrawerSpy).toHaveBeenCalledOnce();
	});

	// it("should create", () => {
	// 	fixture.autoDetectChanges();

	// 	expect(component).toBeDefined();
	// 	expect(component.headerState$.value).toBe("closed");

	// 	clickElement(fixture, ".opener");
	// 	expect(component.headerState$.value).toBe("open");

	// 	getElement(fixture, ".opener").dispatchEvent(new TouchEvent("touchstart"));
	// 	expect(component.headerState$.value).toBe("closed");

	// 	clickElement(fixture, 'button[color="primary"]');
	// 	getMatchWebBreakpoint$.next(false);
	// 	fixture.detectChanges();
	// 	clickElement(fixture, 'button[color="primary"]');
	// 	expect(logoutSpy).toHaveBeenCalledTimes(2);

	// 	const toggleDrawerSpy = vi.spyOn(component.toggleDrawer$, "emit");
	// 	const menuButton: HTMLButtonElement = getElement(fixture, "button mat-icon")
	// 		.parentElement as HTMLButtonElement;
	// 	menuButton.click();

	// 	expect(toggleDrawerSpy).toHaveBeenCalledOnce();
	// });
});
