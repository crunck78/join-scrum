import { render } from "@testing-library/angular";
import { BehaviorSubject } from "rxjs";
import { describe, expect, it, vi } from "vitest";
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
	it("should create", async () => {
		const { fixture } = await render(HeaderComponent);

		expect(fixture.componentInstance).toBeTruthy();
	});

	it("should toggle headerState when toggleHeader is invoked", async () => {
		const { fixture } = await render(HeaderComponent);
		expect(fixture.componentInstance.headerState$.value).toBe("closed");

		fixture.componentInstance.toggleHeader(new Event("click"));
		expect(fixture.componentInstance.headerState$.value).toBe("open");

		fixture.componentInstance.toggleHeader(new Event("click"));
		expect(fixture.componentInstance.headerState$.value).toBe("closed");
	});

	it("should call HeaderService.logout when the logout button is clicked", async () => {
		const headerServiceStub = new HeaderServiceStub();
		const { fixture } = await render(HeaderComponent, {
			providers: [{ provide: HeaderService, useValue: headerServiceStub }],
		});

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

	it("should emit toggleDrawer when the menu button is clicked", async () => {
		const headerServiceStub = new HeaderServiceStub();
		const { fixture } = await render(HeaderComponent, {
			providers: [{ provide: HeaderService, useValue: headerServiceStub }],
		});

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
