import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { HeaderComponent } from "./header.component";
import { HeaderService } from "./header.service";

class HeaderServiceStub {
	logout = vi.fn();
	breakPoints = {
		matchesWebBreakpoint$: new BehaviorSubject<boolean>(true),
		mobile$: new BehaviorSubject<boolean>(false),
	};
}

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	const headerServiceStub = new HeaderServiceStub();

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HeaderComponent],
			providers: [{ provide: HeaderService, useValue: headerServiceStub }],
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should toggle headerState when toggleHeader is invoked", () => {
		expect(fixture.componentInstance.headerState$.value).toBe("closed");

		fixture.componentInstance.toggleHeader(new Event("click"));
		expect(fixture.componentInstance.headerState$.value).toBe("open");

		fixture.componentInstance.toggleHeader(new Event("click"));
		expect(fixture.componentInstance.headerState$.value).toBe("closed");
	});

	it("should call HeaderService.logout when the logout button is clicked", () => {
		const logoutWebButton: HTMLButtonElement =
			fixture.nativeElement.querySelector('button[color="primary"]');
		logoutWebButton.click();

		headerServiceStub.breakPoints.matchesWebBreakpoint$.next(false);
		headerServiceStub.breakPoints.mobile$.next(true);

		const logoutMobileButton: HTMLButtonElement =
			fixture.nativeElement.querySelector('button[color="primary"]');
		logoutMobileButton.click();

		expect(headerServiceStub.logout).toHaveBeenCalledTimes(2);
	});

	it("should emit toggleDrawer when the menu button is clicked", () => {
		let emissionCount = 0;
		const sub = fixture.componentInstance.toggleDrawer.subscribe(() => {
			emissionCount += 1;
		});

		const menuButton: HTMLButtonElement = fixture.nativeElement.querySelector(
			"button mat-icon",
		).parentElement as HTMLButtonElement;
		menuButton.click();

		expect(emissionCount).toBe(1);
		sub.unsubscribe();
	});
});
