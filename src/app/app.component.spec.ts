import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject, firstValueFrom, Observable, of } from "rxjs";
import { Mock } from "vitest";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";

describe("AppComponent", () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let appService: AppService;
	let getIsLoggedInSpy$: Mock<() => Observable<boolean>>;
	let getWebSpy$: Mock<() => Observable<string>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [AppService],
		});
		appService = TestBed.inject(AppService);
		getIsLoggedInSpy$ = vi.spyOn(appService, "isLoggedIn$", "get");
		getWebSpy$ = vi.spyOn(appService, "web$", "get");
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create", () => {
		getIsLoggedInSpy$.mockReturnValue(of(false));
		getWebSpy$.mockReturnValue(of("over"));
		fixture.detectChanges();
		expect(component).toBeDefined();
	});

	it("should emit false when not logged in", async () => {
		getIsLoggedInSpy$.mockReturnValue(of(false));
		expect(await firstValueFrom(component.isLoggedIn$)).toBe(false);
	});

	it("should emit true when logged in", async () => {
		getIsLoggedInSpy$.mockReturnValue(of(true));
		expect(await firstValueFrom(component.isLoggedIn$)).toBe(true);
	});

	it("should emit 'over' when web breakpoint is not matched", async () => {
		getWebSpy$.mockReturnValue(of("over"));
		expect(await firstValueFrom(component.web$)).toBe("over");
	});

	it("should emit 'side' when web breakpoint is matched", async () => {
		getWebSpy$.mockReturnValue(of("side"));
		expect(await firstValueFrom(component.web$)).toBe("side");
	});

	it("should show the header only when logged in", () => {
		const isLoggedIn$ = new BehaviorSubject(false);
		getIsLoggedInSpy$.mockReturnValue(isLoggedIn$);
		getWebSpy$.mockReturnValue(of("over"));
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector("app-header")).toBeNull();
		isLoggedIn$.next(true);
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector("app-header")).not.toBeNull();
	});
});
