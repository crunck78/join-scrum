import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Mock } from "vitest";
import { ScrumApiService } from "./scrum-api.service";

describe("ScrumApiService", () => {
	let service: ScrumApiService;
	let navigate: Mock;

	beforeEach(() => {
		navigate = vi.fn();
		TestBed.configureTestingModule({
			providers: [{ provide: Router, useValue: { navigate } }],
		});
		service = TestBed.inject(ScrumApiService);
	});

	afterEach(() => vi.restoreAllMocks());

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("token", () => {
		it("should return the current apiToken value", () => {
			service.apiToken$.next({ token: "abc" });
			expect(service.token).toBe("abc");
		});
	});

	describe("isLoggedIn", () => {
		it("should return true when token is set", () => {
			service.apiToken$.next({ token: "test-token" });
			expect(service.isLoggedIn()).toBe(true);
		});

		it("should return false when token is empty", () => {
			service.apiToken$.next({ token: "" });
			expect(service.isLoggedIn()).toBe(false);
		});
	});

	describe("rememberMe", () => {
		it("should save value to localStorage", () => {
			const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
			service.rememberMe = true;
			expect(setItemSpy).toHaveBeenCalledWith("rememberMe", "true");
		});

		it("should read value from localStorage", () => {
			vi.spyOn(Storage.prototype, "getItem").mockReturnValue("true");
			expect(service.rememberMe).toBe(true);
		});

		it("should be false when localStorage read fails", () => {
			vi.spyOn(Storage.prototype, "getItem").mockThrowOnce(
				new Error("Fail to read localStorage"),
			);
			expect(service.rememberMe).toBe(false);
		});
	});

	describe("localToken", () => {
		it("should save token to localStorage", () => {
			const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
			service.localToken = "my-token";
			expect(setItemSpy).toHaveBeenCalledWith("join-token", "my-token");
		});

		it("should read token from localStorage", () => {
			vi.spyOn(Storage.prototype, "getItem").mockReturnValue("stored-token");
			expect(service.localToken).toBe("stored-token");
		});

		it("should be empty when localStorage read fails", () => {
			vi.spyOn(Storage.prototype, "getItem").mockThrowOnce(
				new Error("Fail to read localStorage"),
			);
			expect(service.localToken).toBe("");
		});
	});

	describe("logout", () => {
		it("should navigate to the login page", () => {
			service.logout();
			expect(navigate).toHaveBeenCalledWith(["/auth/log-in"]);
		});

		it("should reset apiToken$", () => {
			service.apiToken$.next({ token: "some-token" });
			service.logout();
			expect(service.apiToken$.getValue().token).toBe("");
		});

		it("should clear localToken when rememberMe is true", () => {
			const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
			vi.spyOn(service, "rememberMe", "get").mockReturnValue(true);
			service.logout();
			expect(setItemSpy).toHaveBeenCalledWith("join-token", "");
		});

		it("should not clear localToken when rememberMe is false", () => {
			const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
			vi.spyOn(service, "rememberMe", "get").mockReturnValue(false);
			service.logout();
			expect(setItemSpy).not.toHaveBeenCalledWith(
				"join-token",
				expect.anything(),
			);
		});
	});
});
