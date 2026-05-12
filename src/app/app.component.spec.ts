import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDrawerHarness } from "@angular/material/sidenav/testing";
import { By } from "@angular/platform-browser";
import { BehaviorSubject, Observable } from "rxjs";
import { Mock } from "vitest";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { HeaderComponent } from "./header/header.component";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	let appService: AppService;
	let getIsLoggedInSpy$: Mock<() => Observable<boolean>>;
	let getWebSpy$: Mock<() => Observable<string>>;
	let loader: HarnessLoader;
	let web$: BehaviorSubject<string>;
	let isLoggedIn$: BehaviorSubject<boolean>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [AppService],
		});
		appService = TestBed.inject(AppService);
		getIsLoggedInSpy$ = vi.spyOn(appService, "isLoggedIn$", "get");
		getWebSpy$ = vi.spyOn(appService, "web$", "get");

		fixture = TestBed.createComponent(AppComponent);

		web$ = new BehaviorSubject("");
		isLoggedIn$ = new BehaviorSubject(false);

		getWebSpy$.mockReturnValue(web$);
		getIsLoggedInSpy$.mockReturnValue(isLoggedIn$);
		loader = TestbedHarnessEnvironment.loader(fixture);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create component", async () => {
		const matDrawer = await loader.getHarness(MatDrawerHarness);

		expect(await matDrawer.getMode()).toBe("side");

		web$.next("side");
		expect(await matDrawer.getMode()).toBe("side");

		web$.next("over");
		expect(await matDrawer.getMode()).toBe("over");

		isLoggedIn$.next(true);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector("app-header")).toBeTruthy();

		const header = fixture.debugElement.query(By.directive(HeaderComponent))
			.componentInstance as HeaderComponent;
		header.toggleDrawer$.emit();
		expect(await matDrawer.isOpen()).toBe(false);
		header.toggleDrawer$.emit();
		expect(await matDrawer.isOpen()).toBe(true);
	});
});
