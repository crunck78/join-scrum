import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Mock } from "vitest";
import {
	ForgotPasswordCredentials,
	ScrumForgotPasswordService,
} from "../../../scrum-api/scrum-forgot-password/scrum-forgot-password.service";
import { ForgotPasswordService } from "./forgot-password.service";

describe("ForgotPasswordService", () => {
	let service: ForgotPasswordService;
	let scrumForgotPasswordServiceSpy: Mock<
		(credentials: ForgotPasswordCredentials) => Observable<boolean>
	>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ForgotPasswordService, ScrumForgotPasswordService],
		});
		const scrumService = TestBed.inject(ScrumForgotPasswordService);
		scrumForgotPasswordServiceSpy = vi.spyOn(scrumService, "sendMail");
		service = TestBed.inject(ForgotPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should open snack bar on successful mail send", () => {
		const feedbackSpy = vi.spyOn(service["feedbackService"], "openSnackBar");
		scrumForgotPasswordServiceSpy.mockReturnValue(of(true));

		service.sendMail({ email: "test@example.com" });
		expect(feedbackSpy).toHaveBeenCalledOnce();
	});

	it("should not open snack bar on successful mail send", () => {
		const feedbackSpy = vi.spyOn(service["feedbackService"], "openSnackBar");
		scrumForgotPasswordServiceSpy.mockReturnValue(of(false));

		service.sendMail({ email: "test@example.com" });
		expect(feedbackSpy).toHaveBeenCalledTimes(0);
	});
});
