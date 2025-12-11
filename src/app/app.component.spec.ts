import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject, firstValueFrom, skip } from "rxjs";
import { AppComponent } from "./app.component";
import { ApiToken, ScrumApiService } from "./scrum-api/scrum-api.service";
import { BreakpointsService } from "./shared/shared-services/breakpoints/breakpoints.service";

class BreakpointsServiceStub {
	matchesWebBreakpoint$ = new BehaviorSubject<boolean>(false);
}

class ScrumApiServiceStub {
	apiToken$ = new BehaviorSubject<ApiToken>({ token: "" });
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onNextToken(_: ApiToken): void {}
}

describe("AppComponent", () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let breakpointsStub: BreakpointsServiceStub;
	let scrumStub: ScrumApiServiceStub;

	beforeEach(() => {
		breakpointsStub = new BreakpointsServiceStub();
		scrumStub = new ScrumApiServiceStub();
		TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				{ provide: BreakpointsService, useValue: breakpointsStub },
				{ provide: ScrumApiService, useValue: scrumStub },
			],
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeDefined();
	});

	it("should emit false when not logged in", async () => {
		const value: boolean = await firstValueFrom(
			fixture.componentInstance.isLoggedIn$,
		);
		expect(value).toBe(false);
	});

	it("should emit true when logged in", async () => {
		const emission: Promise<boolean> = firstValueFrom(
			fixture.componentInstance.isLoggedIn$.pipe(skip(1)),
		);
		scrumStub.apiToken$.next({ token: "token" });
		expect(await emission).toBe(true);
	});

	it("should emit 'over' when web breakpoint is not matched", async () => {
		const values: string[] = [];
		const sub = fixture.componentInstance.web$.subscribe((mode) =>
			values.push(mode),
		);
		expect(values).toContain("over");
		sub.unsubscribe();
	});

	it("should emit 'side' when web breakpoint is matched", async () => {
		const values: string[] = [];
		const sub = fixture.componentInstance.web$.subscribe((mode) =>
			values.push(mode),
		);
		breakpointsStub.matchesWebBreakpoint$.next(true);
		expect(values).toContain("side");
		sub.unsubscribe();
	});

	// it("should reflect drawer mode changes in the template", async (): Promise<void> => {
	// 	// TODO: Angular Vitest issues testing Angular Material
	// 	const breakpointsStub = new BreakpointsServiceStub();
	// 	const scrumStub = new ScrumApiServiceStub();
	// 	const { fixture, detectChanges } = await render(AppComponent, {
	// 		providers: [
	// 			{ provide: BreakpointsService, useValue: breakpointsStub },
	// 			{ provide: ScrumApiService, useValue: scrumStub },
	// 		],
	// 	});
	// 	const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
	// 	const drawer = await loader.getHarness(MatDrawerHarness);

	// 	expect(await drawer.getMode()).toBe("over");
	// 	breakpointsStub.matchesWebBreakpoint$.next(true);
	// 	detectChanges();
	// 	expect(await drawer.getMode()).toBe("side");
	// });

	it("should show the header only when logged in", async (): Promise<void> => {
		expect(fixture.nativeElement.querySelector("app-header")).toBeNull();
		scrumStub.apiToken$.next({ token: "token" });
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector("app-header")).not.toBeNull();
	});
});
