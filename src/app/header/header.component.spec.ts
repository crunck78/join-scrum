import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject, Observable, of } from "rxjs";
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

	it("should create", () => {
		fixture.autoDetectChanges();

		expect(component).toBeDefined();
		expect(component.headerState$.value).toBe("closed");

		const opener: HTMLElement = fixture.nativeElement.querySelector(".opener");
		opener.click();
		expect(component.headerState$.value).toBe("open");

		opener.dispatchEvent(new TouchEvent("touchstart"));
		expect(component.headerState$.value).toBe("closed");

		let logoutButton: HTMLButtonElement = fixture.nativeElement.querySelector(
			'button[color="primary"]',
		);
		logoutButton.click();
		getMatchWebBreakpoint$.next(false);
		fixture.detectChanges();
		logoutButton = fixture.nativeElement.querySelector(
			'button[color="primary"]',
		);
		logoutButton.click();
		expect(logoutSpy).toHaveBeenCalledTimes(2);

		const toggleDrawerSpy = vi.spyOn(component.toggleDrawer$, "emit");
		const menuButton: HTMLButtonElement = (
			fixture.nativeElement.querySelector("button mat-icon") as HTMLElement
		).parentElement as HTMLButtonElement;
		menuButton.click();

		expect(toggleDrawerSpy).toHaveBeenCalledOnce();
	});
});
